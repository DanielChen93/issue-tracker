import { Flex } from "@radix-ui/themes";
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

  return <IssueChart open={open} inProgress={inProgress} closed={closed} />;
}
