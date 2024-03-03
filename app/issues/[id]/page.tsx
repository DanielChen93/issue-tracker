import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import MarkDown from "react-markdown";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="5">
        <IssueStatusBadge status={issue.status} />
        <div>{issue.createdAt.toDateString()}</div>
      </Flex>
      <Card className="prose" mt="5">
        <MarkDown>{issue.description}</MarkDown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
