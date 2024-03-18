"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status | "ALL" }[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChange = (value: string) => {
    const params = new URLSearchParams();
    if (searchParams.get("sortBy")) {
      params.append("sortBy", searchParams.get("sortBy")!);
    }
    if (searchParams.get("sortOrder")) {
      params.append("sortOrder", searchParams.get("sortOrder")!);
    }
    if (value !== "ALL") {
      params.append("status", value);
    }

    const query = params.size ? "?" + params.toString() : "";

    router.push("/issues/list/" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={onValueChange}
    >
      <Select.Trigger defaultValue="ALL" placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
