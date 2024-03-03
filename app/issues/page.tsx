import { Button, Table, TableRow, TableRowHeaderCell } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
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
                {issue.title}
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

export default Issues;
