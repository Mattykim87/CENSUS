import { pgTable } from "@/db/utils";
import { sql } from "drizzle-orm";
import { boolean, jsonb, real, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";

export const tasks = pgTable("tasks", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  code: varchar("code", { length: 128 }).notNull().unique(),
  title: varchar("title", { length: 128 }),
  status: varchar("status", {
    length: 30,
    enum: ["todo", "in-progress", "done", "canceled"],
  })
    .notNull()
    .default("todo"),
  label: varchar("label", {
    length: 30,
    enum: ["bug", "feature", "enhancement", "documentation"],
  })
    .notNull()
    .default("bug"),
  priority: varchar("priority", {
    length: 30,
    enum: ["low", "medium", "high"],
  })
    .notNull()
    .default("low"),
  estimatedHours: real("estimated_hours").notNull().default(0),
  description: text("description"),
  dueDate: timestamp("due_date"),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
  // New fields for CSV support
  isCSVFile: boolean("is_csv_file").notNull().default(false),
  csvFilename: varchar("csv_filename", { length: 255 }),
  csvHeaders: jsonb("csv_headers"),
  csvRowCount: real("csv_row_count"),
  csvUploadStatus: varchar("csv_upload_status", {
    length: 30,
    enum: ["pending", "processing", "completed", "failed"],
  }),
  csvUploadError: text("csv_upload_error"),
});

// Table to track CSV upload attempts
export const csvUploads = pgTable("csv_uploads", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  status: varchar("status", {
    length: 30,
    enum: ["pending", "processing", "completed", "failed"],
  })
    .notNull()
    .default("pending"),
  errorMessage: text("error_message"),
  rowCount: real("row_count"),
  headers: jsonb("headers"),
  taskId: varchar("task_id", { length: 30 }).references(() => tasks.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type CSVUpload = typeof csvUploads.$inferSelect;
export type NewCSVUpload = typeof csvUploads.$inferInsert;
