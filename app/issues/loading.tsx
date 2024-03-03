import { Table, TableRowHeaderCell, TableRow } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Skeleton } from "../components";

const IssuesLoading = () => {
  const issues = [1, 2, 3, 4, 5];

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
            <TableRow key={issue}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </TableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesLoading;
