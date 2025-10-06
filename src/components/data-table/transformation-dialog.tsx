"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Transformation,
  TransformationType,
} from "@/lib/data-transformations";
import { useState } from "react";

interface TransformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnName: string;
  allColumns: string[];
  onAdd: (transformation: Omit<Transformation, "id">) => void;
}

export function TransformationDialog({
  open,
  onOpenChange,
  columnName,
  allColumns,
  onAdd,
}: TransformationDialogProps) {
  const [transformationType, setTransformationType] =
    useState<TransformationType>("find-replace");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [fillValue, setFillValue] = useState("");
  const [separator, setSeparator] = useState(",");
  const [newColumnNames, setNewColumnNames] = useState("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [mergeColumnName, setMergeColumnName] = useState("");
  const [mergeSeparator, setMergeSeparator] = useState(" ");

  const handleAdd = () => {
    let params: Record<string, unknown> = {};

    switch (transformationType) {
      case "find-replace":
        params = { findText, replaceText, caseSensitive };
        break;
      case "fill-empty":
        params = { fillValue };
        break;
      case "split-column":
        params = {
          separator,
          newColumnNames: newColumnNames
            .split(",")
            .map((name) => name.trim())
            .filter(Boolean),
        };
        break;
      case "merge-columns":
        params = {
          columnNames: selectedColumns,
          separator: mergeSeparator,
        };
        break;
    }

    onAdd({
      type: transformationType,
      columnId:
        transformationType === "merge-columns" ? mergeColumnName : columnName,
      params,
      applied: false,
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFindText("");
    setReplaceText("");
    setCaseSensitive(false);
    setFillValue("");
    setSeparator(",");
    setNewColumnNames("");
    setSelectedColumns([]);
    setMergeColumnName("");
    setMergeSeparator(" ");
  };

  const advancedTransformations: Array<{
    type: TransformationType;
    label: string;
  }> = [
    { type: "find-replace", label: "Find & Replace" },
    { type: "fill-empty", label: "Fill Empty Cells" },
    { type: "split-column", label: "Split Column" },
    { type: "merge-columns", label: "Merge Columns" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Advanced Transformation</DialogTitle>
          <DialogDescription>
            Configure advanced data transformation options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Transformation Type</Label>
            <Select
              value={transformationType}
              onValueChange={(value) =>
                setTransformationType(value as TransformationType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {advancedTransformations.map((t) => (
                  <SelectItem key={t.type} value={t.type}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {transformationType === "find-replace" && (
            <>
              <div className="space-y-2">
                <Label>Column</Label>
                <Input value={columnName} disabled />
              </div>
              <div className="space-y-2">
                <Label>Find Text</Label>
                <Input
                  placeholder="Text to find"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Replace With</Label>
                <Input
                  placeholder="Replacement text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) =>
                    setCaseSensitive(checked as boolean)
                  }
                />
                <Label htmlFor="case-sensitive" className="cursor-pointer">
                  Case sensitive
                </Label>
              </div>
            </>
          )}

          {transformationType === "fill-empty" && (
            <>
              <div className="space-y-2">
                <Label>Column</Label>
                <Input value={columnName} disabled />
              </div>
              <div className="space-y-2">
                <Label>Fill Value</Label>
                <Input
                  placeholder="Value to fill empty cells"
                  value={fillValue}
                  onChange={(e) => setFillValue(e.target.value)}
                />
              </div>
            </>
          )}

          {transformationType === "split-column" && (
            <>
              <div className="space-y-2">
                <Label>Column to Split</Label>
                <Input value={columnName} disabled />
              </div>
              <div className="space-y-2">
                <Label>Separator</Label>
                <Input
                  placeholder="e.g., comma, space, pipe"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>New Column Names (comma-separated)</Label>
                <Input
                  placeholder="e.g., FirstName, LastName"
                  value={newColumnNames}
                  onChange={(e) => setNewColumnNames(e.target.value)}
                />
              </div>
            </>
          )}

          {transformationType === "merge-columns" && (
            <>
              <div className="space-y-2">
                <Label>Columns to Merge</Label>
                <div className="space-y-2">
                  {allColumns.map((col) => (
                    <div key={col} className="flex items-center space-x-2">
                      <Checkbox
                        id={`merge-${col}`}
                        checked={selectedColumns.includes(col)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedColumns([...selectedColumns, col]);
                          } else {
                            setSelectedColumns(
                              selectedColumns.filter((c) => c !== col),
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`merge-${col}`}
                        className="cursor-pointer"
                      >
                        {col}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>New Column Name</Label>
                <Input
                  placeholder="Name for merged column"
                  value={mergeColumnName}
                  onChange={(e) => setMergeColumnName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Separator</Label>
                <Input
                  placeholder="e.g., space, comma"
                  value={mergeSeparator}
                  onChange={(e) => setMergeSeparator(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Transformation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
