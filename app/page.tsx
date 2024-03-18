import { Flex } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await (
    await prisma.issue.findMany({ where: { status: "OPEN" } })
  ).length;
  const in_progress = await (
    await prisma.issue.findMany({ where: { status: "IN_PROGRESS" } })
  ).length;
  const closed = await (
    await prisma.issue.findMany({ where: { status: "CLOSED" } })
  ).length;

  return (
    <Flex align="start" justify="between">
      {/* <LatestIssues /> */}
      <IssueSummary open={open} in_progress={in_progress} closed={closed} />
    </Flex>
  );
}
