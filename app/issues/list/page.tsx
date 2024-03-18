import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";

import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, headerItemNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const statusValues = Object.values(Status);

const Issues = async ({ searchParams }: Props) => {
  const pageSize = 10;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const status = statusValues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const sortOrder = searchParams.sortOrder || "asc";

  const orderBy = headerItemNames.includes(searchParams.sortBy)
    ? { [searchParams.sortBy]: sortOrder }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = (await prisma.issue.findMany({ where: { status } })).length;

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={itemCount}
      />
    </Flex>
  );
};

export const revalidate = 0;

export default Issues;
