-- Add CSV support fields to tasks table
ALTER TABLE "tasks" ADD COLUMN "is_csv_file" boolean NOT NULL DEFAULT false;
ALTER TABLE "tasks" ADD COLUMN "csv_filename" varchar(255);
ALTER TABLE "tasks" ADD COLUMN "csv_headers" jsonb;
ALTER TABLE "tasks" ADD COLUMN "csv_row_count" real;
ALTER TABLE "tasks" ADD COLUMN "csv_upload_status" varchar(30);
ALTER TABLE "tasks" ADD COLUMN "csv_upload_error" text;

-- Create table for tracking CSV uploads
CREATE TABLE IF NOT EXISTS "csv_uploads" (
  "id" varchar(30) PRIMARY KEY NOT NULL,
  "filename" varchar(255) NOT NULL,
  "status" varchar(30) NOT NULL DEFAULT 'pending',
  "error_message" text,
  "row_count" real,
  "headers" jsonb,
  "task_id" varchar(30) REFERENCES "tasks" ("id"),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT current_timestamp
);
