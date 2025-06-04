"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/handle-error";
import { uploadCSV } from "../_lib/actions";
import { type CSVUploadSchema, csvUploadSchema } from "../_lib/validations";
import { CSVPreviewSheet } from "./csv-preview-sheet";

interface CSVUploadSheetProps {
  children: React.ReactNode;
}

export function CSVUploadSheet({ children }: CSVUploadSheetProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "processing" | "success" | "error"
  >("idle");

  const form = useForm<CSVUploadSchema>({
    resolver: zodResolver(csvUploadSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: CSVUploadSchema) => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        // Stop at 90% - the final 10% will be shown after server processing
        const newProgress = prevProgress + (90 - prevProgress) * 0.1;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 300);

    // Read the file content
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const csvContent = event.target.result as string;
        setUploadStatus("processing");

        startTransition(async () => {
          try {
            const result = await uploadCSV({
              csvContent,
              filename: selectedFile.name,
              title: data.title,
              description: data.description,
            });

            clearInterval(progressInterval);

            if (result.error) {
              setUploadStatus("error");
              toast.error(result.error);
              return;
            }

            setUploadProgress(100);
            setUploadStatus("success");
            toast.success("CSV file uploaded successfully");
            
            // Reset form after a brief delay to show 100% completion
            setTimeout(() => {
              setIsOpen(false);
              form.reset();
              setSelectedFile(null);
              setUploadProgress(0);
              setUploadStatus("idle");
            }, 1000);
          } catch (err) {
            clearInterval(progressInterval);
            setUploadStatus("error");
            toast.error(getErrorMessage(err));
          }
        });
      }
    };
    reader.readAsText(selectedFile);
  };

  const handlePreviewConfirm = (
    file: File,
    _headers: string[],
    _rowCount: number,
  ) => {
    setSelectedFile(file);
    form.setValue("file", file);
    // Optional: You could store and display the headers and rowCount information
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload CSV File</SheetTitle>
          <SheetDescription>Upload a CSV file to create tasks</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <CSVPreviewSheet
                  onConfirm={(file, headers, rowCount) =>
                    handlePreviewConfirm(file, headers, rowCount)
                  }
                >
                  <Button type="button" variant="outline" className="w-full">
                    {selectedFile
                      ? `Selected: ${selectedFile.name}`
                      : "Select CSV File"}
                  </Button>
                </CSVPreviewSheet>
                {selectedFile && (
                  <p className="text-muted-foreground text-sm">
                    {selectedFile.name} ({Math.round(selectedFile.size / 1024)}{" "}
                    KB)
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CSV Import"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional details about this CSV file"
                        className="resize-none"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(uploadStatus === "uploading" || uploadStatus === "processing") && (
                <div className="space-y-2 my-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    {uploadStatus === "uploading" ? "Uploading file..." : "Processing CSV data..."}
                    {uploadProgress > 0 && ` (${Math.round(uploadProgress)}%)`}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    form.reset();
                    setSelectedFile(null);
                    setUploadProgress(0);
                    setUploadStatus("idle");
                  }}
                  disabled={isPending || uploadStatus === "uploading" || uploadStatus === "processing"}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending || !selectedFile || uploadStatus === "uploading" || uploadStatus === "processing"}
                  className="min-w-[100px]"
                >
                  {uploadStatus === "uploading" ? "Uploading..." : 
                   uploadStatus === "processing" ? "Processing..." : "Upload CSV"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
