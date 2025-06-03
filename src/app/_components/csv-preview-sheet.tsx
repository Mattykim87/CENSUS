"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { getErrorMessage } from "@/lib/handle-error";
import { previewCSV } from "../_lib/actions";
import { type CSVPreviewSchema, csvPreviewSchema } from "../_lib/validations";

interface CSVPreviewSheetProps {
  onConfirm: (file: File, headers: string[], rowCount: number) => void;
  children: React.ReactNode;
}

export function CSVPreviewSheet({ onConfirm, children }: CSVPreviewSheetProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    headers: string[];
    rows: Record<string, string>[];
    totalRows: number;
  } | null>(null);

  const form = useForm<CSVPreviewSchema>({
    resolver: zodResolver(csvPreviewSchema),
    defaultValues: {},
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
              }
            } catch (err) {
              toast.error(getErrorMessage(err));
            }
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConfirm = () => {
    const file = form.getValues("file");
    if (file && previewData) {
      onConfirm(file, previewData.headers, previewData.totalRows);
      setIsOpen(false);
      form.reset();
      setPreviewData(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Preview CSV File</SheetTitle>
          <SheetDescription>
            Preview the contents of your CSV file before uploading
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
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                        onFileChange(e);
                      }}
                      disabled={isPending}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          {previewData && (
            <div className="mt-6">
              <div className="mb-2 text-muted-foreground text-sm">
                Total rows: {previewData.totalRows} (showing first 10)
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
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={isPending}>
                  Confirm & Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
