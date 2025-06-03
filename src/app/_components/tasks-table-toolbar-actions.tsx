"use client";

import type { Task } from "@/db/schema";
import type { Table } from "@tanstack/react-table";
import { Download, FileUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateTaskSheet } from "./create-task-sheet";
import { CSVExportButton } from "./csv-export-button";
import { CSVUploadSheet } from "./csv-upload-sheet";
import { DeleteTasksDialog } from "./delete-tasks-dialog";

interface TasksTableToolbarActionsProps {
  table: Table<Task>;
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateTaskSheet />
      <CSVExportButton 
        ids={table.getFilteredSelectedRowModel().rows.length > 0 
          ? table.getFilteredSelectedRowModel().rows.map(row => row.original.id) 
          : undefined}
      />
      <CSVUploadSheet>
        <Button variant="outline" size="sm">
          <FileUp className="mr-2 h-4 w-4" />
          Import CSV
        </Button>
      </CSVUploadSheet>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
