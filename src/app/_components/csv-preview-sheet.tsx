"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DataTransformationPanel } from "@/components/data-table/data-transformation-panel";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type Transformation,
  applyTransformations,
} from "@/lib/data-transformations";
import { getErrorMessage } from "@/lib/handle-error";
import { previewCSV } from "../_lib/actions";
import { type CSVPreviewSchema, csvPreviewSchema } from "../_lib/validations";

interface CSVPreviewSheetProps {
  onConfirm: (
    file: File,
    headers: string[],
    rowCount: number,
    transformedData?: Record<string, string>[],
  ) => void;
  children: React.ReactNode;
}

export function CSVPreviewSheet({ onConfirm, children }: CSVPreviewSheetProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState<{
    headers: string[];
    rows: Record<string, string>[];
    totalRows: number;
  } | null>(null);
  const [originalData, setOriginalData] = useState<Record<string, string>[]>(
    [],
  );
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [transformedData, setTransformedData] = useState<
    Record<string, string>[]
  >([]);

  const form = useForm<CSVPreviewSchema>({
    resolver: zodResolver(csvPreviewSchema),
    defaultValues: {},
  });

  const processFile = (file: File | undefined) => {
    if (!file) return;

    form.setValue("file", file);

    // Read the file and preview it
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const csvContent = event.target.result as string;

        startTransition(async () => {
          try {
            const result = await previewCSV({ csvContent });

            if (result.error) {
              toast.error(result.error);
              return;
            }

            if (result.data) {
              setPreviewData(result.data);
              setOriginalData(result.data.rows);
              setTransformedData(result.data.rows);
            }
          } catch (err) {
            toast.error(getErrorMessage(err));
          }
        });
      }
    };
    reader.readAsText(file);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Ensure file is defined before accessing its properties
      if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
        processFile(file);
      } else {
        toast.error("Please drop a CSV file");
      }
    }
  };

  const handleTransformationsChange = (
    newTransformations: Transformation[],
  ) => {
    setTransformations(newTransformations);
    if (originalData.length > 0) {
      const transformed = applyTransformations(
        originalData,
        newTransformations,
      );
      setTransformedData(transformed);

      // Update preview data with transformed data
      if (previewData) {
        const transformedHeaders = Object.keys(transformed[0] || {});
        setPreviewData({
          ...previewData,
          headers: transformedHeaders,
          rows: transformed.slice(0, 10),
        });
      }
    }
  };

  const handleConfirm = () => {
    const formFile = form.getValues("file");

    // Explicit type guard to make TypeScript happy
    if (!formFile || !previewData) {
      return;
    }

    // At this point TypeScript knows formFile is defined and is a File
    // Pass transformed data if transformations were applied
    onConfirm(
      formFile,
      previewData.headers,
      previewData.totalRows,
      transformations.length > 0 ? transformedData : undefined,
    );
    setIsOpen(false);
    form.reset();
    setPreviewData(null);
    setOriginalData([]);
    setTransformedData([]);
    setTransformations([]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-[90vw] lg:max-w-[1200px]">
        <SheetHeader>
          <SheetTitle>Preview & Transform CSV File</SheetTitle>
          <SheetDescription>
            Preview and apply OpenRefine-style transformations to your CSV
            before uploading
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>CSV File</FormLabel>
                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-2 h-10 w-10 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-1 font-medium">
                        Drag and drop your CSV file here, or{" "}
                        <span className="cursor-pointer text-primary">
                          browse
                        </span>
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Supports CSV files up to 10MB
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                        onFileChange(e);
                      }}
                      disabled={isPending}
                      className="hidden"
                      id="csv-file-input"
                      {...rest}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        document.getElementById("csv-file-input")?.click()
                      }
                      disabled={isPending}
                    >
                      Select File
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          {previewData && (
            <div className="mt-6 space-y-6">
              {/* Data Transformation Panel */}
              <DataTransformationPanel
                data={originalData}
                headers={Object.keys(originalData[0] || {})}
                onTransformationsChange={handleTransformationsChange}
              />

              {/* Preview Table */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-muted-foreground text-sm">
                    Total rows: {previewData.totalRows} (showing first 10)
                    {transformations.length > 0 && (
                      <span className="ml-2 text-primary">
                        • {transformations.length} transformation(s) applied
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-[400px] overflow-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {previewData.headers.map((header) => (
                          <TableHead key={header}>{header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.rows.map((row, index) => (
                        <TableRow key={index}>
                          {previewData.headers.map((header) => (
                            <TableCell key={`${index}-${header}`}>
                              {row[header] || ""}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                      setPreviewData(null);
                      setOriginalData([]);
                      setTransformedData([]);
                      setTransformations([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleConfirm} disabled={isPending}>
                    Confirm & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
