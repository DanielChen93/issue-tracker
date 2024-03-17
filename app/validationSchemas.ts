import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").max(255).optional(),
  assignedUserId: z
    .string()
    .min(1, "User Id is required")
    .max(255)
    .optional()
    .nullable(),
});
