import { Table, TableRow, TableRowHeaderCell } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { IssueStatusBadge, Link } from "../../components";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const statusValues = Object.values(Status);

const Issues = async ({ searchParams }: Props) => {
  const status = statusValues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <TableRowHeaderCell>Issue</TableRowHeaderCell>
            <TableRowHeaderCell className="hidden md:table-cell">
              Status
            </TableRowHeaderCell>
            <TableRowHeaderCell className="hidden md:table-cell">
              Created
            </TableRowHeaderCell>
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
