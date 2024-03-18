import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await (
    await prisma.issue.findMany({ where: { status: "OPEN" } })
  ).length;
  const inProgress = await (
    await prisma.issue.findMany({ where: { status: "IN_PROGRESS" } })
  ).length;
  const closed = await (
    await prisma.issue.findMany({ where: { status: "CLOSED" } })
  ).length;

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary issueCount={{ open, inProgress, closed }} />
        <IssueChart issueCount={{ open, inProgress, closed }} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
