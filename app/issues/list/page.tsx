import { Flex, Table, TableRow, TableRowHeaderCell } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { IssueStatusBadge, Link } from "../../components";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    sortBy: keyof Issue;
    sortOrder: "asc" | "desc";
  };
}

const statusValues = Object.values(Status);

const headerItems: { label: string; value: keyof Issue; className?: string }[] =
  [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

const Issues = async ({ searchParams }: Props) => {
  const status = statusValues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const sortOrder = searchParams.sortOrder || "asc";
  const orderBy = headerItems
    .map((item) => item.value)
    .includes(searchParams.sortBy)
    ? { [searchParams.sortBy]: sortOrder }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headerItems.map((item) => (
              <TableRowHeaderCell className={item.className} key={item.value}>
                <Flex align="center" gap="1">
                  <NextLink
                    href={{ query: { ...searchParams, sortBy: item.value } }}
                  >
                    {item.label}
                  </NextLink>
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        sortOrder: sortOrder === "asc" ? "desc" : "asc",
                      },
                    }}
                  >
                    {sortOrder === "asc" ? (
                      <ArrowUpIcon
                        className="cursor-pointer"
                        opacity={item.value === searchParams.sortBy ? 1 : 0}
                      />
                    ) : (
                      <ArrowDownIcon
                        className="cursor-pointer"
                        opacity={item.value === searchParams.sortBy ? 1 : 0}
                      />
                    )}
                  </NextLink>
                </Flex>
              </TableRowHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </TableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const revalidate = 0;

export default Issues;
