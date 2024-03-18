import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const fetchUser = (issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } });

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}
