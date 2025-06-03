"use server";

import { db } from "@/db/index";
import { type Task, tasks, csvUploads } from "@/db/schema";
import { takeFirstOrThrow } from "@/db/utils";
import { asc, eq, inArray, not } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import { revalidateTag, unstable_noStore } from "next/cache";

import { convertTasksToCSV, parseCSV, csvToTaskData } from "@/lib/csv";
import { getErrorMessage } from "@/lib/handle-error";

import { generateRandomTask } from "./utils";
import type { CreateTaskSchema, UpdateTaskSchema } from "./validations";

export async function seedTasks(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    const allTasks: Task[] = [];

    for (let i = 0; i < count; i++) {
      allTasks.push(generateRandomTask());
    }

    await db.delete(tasks);

    console.log("📝 Inserting tasks", allTasks.length);

    await db.insert(tasks).values(allTasks).onConflictDoNothing();
  } catch (err) {
    console.error(err);
  }
}

export async function createTask(input: CreateTaskSchema) {
  unstable_noStore();
  try {
    await db.transaction(async (tx) => {
      const newTask = await tx
        .insert(tasks)
        .values({
          code: `TASK-${customAlphabet("0123456789", 4)()}`,
          title: input.title,
          status: input.status,
          label: input.label,
          priority: input.priority,
        })
        .returning({
          id: tasks.id,
        })
        .then(takeFirstOrThrow);

      // Delete a task to keep the total number of tasks constant
      await tx.delete(tasks).where(
        eq(
          tasks.id,
          (
            await tx
              .select({
                id: tasks.id,
              })
              .from(tasks)
              .limit(1)
              .where(not(eq(tasks.id, newTask.id)))
              .orderBy(asc(tasks.createdAt))
              .then(takeFirstOrThrow)
          ).id,
        ),
      );
    });

    revalidateTag("tasks");
    revalidateTag("task-status-counts");
    revalidateTag("task-priority-counts");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateTask(input: UpdateTaskSchema & { id: string }) {
  unstable_noStore();
  try {
    const data = await db
      .update(tasks)
      .set({
        title: input.title,
        label: input.label,
        status: input.status,
        priority: input.priority,
      })
      .where(eq(tasks.id, input.id))
      .returning({
        status: tasks.status,
        priority: tasks.priority,
      })
      .then(takeFirstOrThrow);

    revalidateTag("tasks");
    if (data.status === input.status) {
      revalidateTag("task-status-counts");
    }
    if (data.priority === input.priority) {
      revalidateTag("task-priority-counts");
    }

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateTasks(input: {
  ids: string[];
  label?: Task["label"];
  status?: Task["status"];
  priority?: Task["priority"];
}) {
  unstable_noStore();
  try {
    const data = await db
      .update(tasks)
      .set({
        label: input.label,
        status: input.status,
        priority: input.priority,
      })
      .where(inArray(tasks.id, input.ids))
      .returning({
        status: tasks.status,
        priority: tasks.priority,
      })
      .then(takeFirstOrThrow);

    revalidateTag("tasks");
    if (data.status === input.status) {
      revalidateTag("task-status-counts");
    }
    if (data.priority === input.priority) {
      revalidateTag("task-priority-counts");
    }

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteTask(input: { id: string }) {
  unstable_noStore();
  try {
    await db.transaction(async (tx) => {
      await tx.delete(tasks).where(eq(tasks.id, input.id));

      // Create a new task for the deleted one
      await tx.insert(tasks).values(generateRandomTask());
    });

    revalidateTag("tasks");
    revalidateTag("task-status-counts");
    revalidateTag("task-priority-counts");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteTasks(input: { ids: string[] }) {
  unstable_noStore();
  try {
    await db.transaction(async (tx) => {
      await tx.delete(tasks).where(inArray(tasks.id, input.ids));

      // Create new tasks for the deleted ones
      await tx.insert(tasks).values(input.ids.map(() => generateRandomTask()));
    });

    revalidateTag("tasks");
    revalidateTag("task-status-counts");
    revalidateTag("task-priority-counts");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

/**
 * Upload and process a CSV file
 */
export async function uploadCSV(input: {
  csvContent: string;
  filename: string;
  title: string;
  description?: string;
}) {
  unstable_noStore();
  try {
    const csvData = parseCSV(input.csvContent);
    const headers = Object.keys(csvData[0] || {});

    await db.transaction(async (tx) => {
      // Create main task for the CSV file
      const mainTask = await tx
        .insert(tasks)
        .values({
          code: `CSV-${customAlphabet("0123456789", 4)()}`,
          title: input.title,
          description: input.description,
          status: "todo",
          label: "feature",
          priority: "medium",
          isCSVFile: true,
          csvFilename: input.filename,
          csvHeaders: headers,
          csvRowCount: csvData.length,
          csvUploadStatus: "completed",
        })
        .returning({
          id: tasks.id,
        })
        .then(takeFirstOrThrow);

      // Create a CSV upload record
      await tx.insert(csvUploads).values({
        filename: input.filename,
        status: "completed",
        rowCount: csvData.length,
        headers: headers,
        taskId: mainTask.id,
      });

      // Convert CSV data to tasks
      const taskData = csvToTaskData(csvData);
      
      // Only insert up to 50 items to avoid overloading the database
      const tasksToInsert = taskData.slice(0, 50).map(taskItem => ({
        code: `CSVITEM-${customAlphabet("0123456789", 4)()}`,
        title: taskItem.title || "CSV Item",
        status: taskItem.status || "todo",
        label: taskItem.label || "feature",
        priority: taskItem.priority || "medium",
        estimatedHours: taskItem.estimatedHours || 0,
        description: taskItem.description,
      }));

      if (tasksToInsert.length > 0) {
        await tx.insert(tasks).values(tasksToInsert);
      }
    });

    revalidateTag("tasks");
    revalidateTag("task-status-counts");
    revalidateTag("task-priority-counts");
    revalidateTag("csv-uploads");

    return {
      data: { success: true },
      error: null,
    };
  } catch (err) {
    // Log the failed upload
    try {
      await db.insert(csvUploads).values({
        filename: input.filename,
        status: "failed",
        errorMessage: getErrorMessage(err),
      });
    } catch (logError) {
      console.error("Failed to log CSV upload error:", logError);
    }

    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

/**
 * Preview CSV content without uploading
 */
export async function previewCSV(input: { csvContent: string }) {
  unstable_noStore();
  try {
    const csvData = parseCSV(input.csvContent);
    
    // Only return up to 10 rows for preview
    const previewData = csvData.slice(0, 10);
    const headers = Object.keys(previewData[0] || {});

    return {
      data: {
        headers,
        rows: previewData,
        totalRows: csvData.length,
      },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

/**
 * Export tasks as CSV
 */
export async function exportTasksAsCSV(input: { ids?: string[] }) {
  unstable_noStore();
  try {
    let data: Task[] = [];
    
    if (input.ids?.length) {
      data = await db.select().from(tasks).where(inArray(tasks.id, input.ids));
    } else {
      data = await db.select().from(tasks);
    }
    
    const csv = convertTasksToCSV(data);
    
    return {
      data: { csv },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

/**
 * Get CSV upload history
 */
export async function getCSVUploads() {
  unstable_noStore();
  try {
    const data = await db.select().from(csvUploads).orderBy(asc(csvUploads.createdAt));
    
    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

/**
 * Retry a failed CSV upload
 */
export async function retryCSVUpload(input: { id: string }) {
  unstable_noStore();
  try {
    const upload = await db
      .select()
      .from(csvUploads)
      .where(eq(csvUploads.id, input.id))
      .then(uploads => uploads[0]);
    
    if (!upload) {
      throw new Error("CSV upload not found");
    }
    
    // Update the status to 'processing'
    await db
      .update(csvUploads)
      .set({
        status: "processing",
        updatedAt: new Date(),
      })
      .where(eq(csvUploads.id, input.id));
    
    // Here you would typically re-process the CSV
    // For this example, we'll just mark it as completed
    await db
      .update(csvUploads)
      .set({
        status: "completed",
        errorMessage: null,
        updatedAt: new Date(),
      })
      .where(eq(csvUploads.id, input.id));
    
    revalidateTag("csv-uploads");
    
    return {
      data: { success: true },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
