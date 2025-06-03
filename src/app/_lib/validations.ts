import { type Task, csvUploads, tasks } from "@/db/schema";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import * as z from "zod";

import { flagConfig } from "@/config/flag";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";

export const searchParamsCache = createSearchParamsCache({
  filterFlag: parseAsStringEnum(
    flagConfig.featureFlags.map((flag) => flag.value),
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Task>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  title: parseAsString.withDefault(""),
  status: parseAsArrayOf(z.enum(tasks.status.enumValues)).withDefault([]),
  priority: parseAsArrayOf(z.enum(tasks.priority.enumValues)).withDefault([]),
  estimatedHours: parseAsArrayOf(z.coerce.number()).withDefault([]),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
  // CSV filters
  isCSVFile: parseAsString.withDefault(""),
  csvUploadStatus: parseAsArrayOf(
    z.enum(["pending", "processing", "completed", "failed"]),
  ).withDefault([]),
});

export const createTaskSchema = z.object({
  title: z.string(),
  label: z.enum(tasks.label.enumValues),
  status: z.enum(tasks.status.enumValues),
  priority: z.enum(tasks.priority.enumValues),
  estimatedHours: z.coerce.number().optional(),
  description: z.string().max(2000).optional(),
  dueDate: z.coerce.date().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  label: z.enum(tasks.label.enumValues).optional(),
  status: z.enum(tasks.status.enumValues).optional(),
  priority: z.enum(tasks.priority.enumValues).optional(),
  estimatedHours: z.coerce.number().optional(),
  description: z.string().max(2000).optional(),
  dueDate: z.coerce.date().optional(),
});

export type GetTasksSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

// CSV upload schema
export const csvUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv"),
      "File must be a CSV",
    ),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type CSVUploadSchema = z.infer<typeof csvUploadSchema>;

// CSV preview schema
export const csvPreviewSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv"),
      "File must be a CSV",
    ),
});

export type CSVPreviewSchema = z.infer<typeof csvPreviewSchema>;
