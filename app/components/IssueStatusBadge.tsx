import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusBadgeMap: Record<Status, "red" | "violet" | "green"> = {
  OPEN: "red",
  IN_PROGRESS: "violet",
  CLOSED: "green",
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={statusBadgeMap[status]}>{status}</Badge>;
};

export default IssueStatusBadge;
