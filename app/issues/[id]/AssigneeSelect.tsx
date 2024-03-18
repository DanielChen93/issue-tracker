"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const onSelectChange = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedUserId: userId === "Unassigned" ? null : userId,
      })
      .catch((e) => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Select.Root
        onValueChange={onSelectChange}
        defaultValue={issue.assignedUserId || "Unassigned"}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios.get<User[]>("/api/users").then((result) => result.data),
    retry: 3,
    staleTime: 60 * 1000,
  });

export default AssigneeSelect;
