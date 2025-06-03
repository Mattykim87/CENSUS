"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/handle-error";
import { exportTasksAsCSV } from "../_lib/actions";

interface CSVExportButtonProps {
  ids?: string[];
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export function CSVExportButton({ 
  ids, 
  variant = "outline" 
}: CSVExportButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      try {
        const result = await exportTasksAsCSV({ ids });
        
        if (result.error) {
          toast.error(result.error);
          return;
        }
        
        if (result.data?.csv) {
          // Create blob and download
          const blob = new Blob([result.data.csv], { type: "text/csv;charset=utf-8" });
          saveAs(blob, `tasks-export-${new Date().toISOString().slice(0, 10)}.csv`);
          toast.success("CSV file exported successfully");
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    });
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleExport}
      disabled={isPending}
    >
      {isPending ? (
        "Exporting..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </>
      )}
    </Button>
  );
}
