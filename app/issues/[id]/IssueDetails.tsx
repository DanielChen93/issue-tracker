import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import MarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <div>{issue.createdAt.toDateString()}</div>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <MarkDown>{issue.description}</MarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
