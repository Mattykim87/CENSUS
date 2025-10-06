"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ColumnStats,
  type Transformation,
  type TransformationType,
  analyzeColumn,
} from "@/lib/data-transformations";
import { Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TransformationDialog } from "./transformation-dialog";

interface DataTransformationPanelProps {
  data: Record<string, string>[];
  headers: string[];
  onTransformationsChange: (transformations: Transformation[]) => void;
}

export function DataTransformationPanel({
  data,
  headers,
  onTransformationsChange,
}: DataTransformationPanelProps) {
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [columnStats, setColumnStats] = useState<ColumnStats[]>([]);
  const [showTransformDialog, setShowTransformDialog] = useState(false);

  useEffect(() => {
    if (data.length > 0 && headers.length > 0) {
      const stats = headers.map((header) => analyzeColumn(data, header));
      setColumnStats(stats);
    }
  }, [data, headers]);

  const addTransformation = (transformation: Omit<Transformation, "id">) => {
    const newTransformation: Transformation = {
      ...transformation,
      id: `transform-${Date.now()}-${Math.random()}`,
    };
    const updated = [...transformations, newTransformation];
    setTransformations(updated);
    onTransformationsChange(updated);
  };

  const removeTransformation = (id: string) => {
    const updated = transformations.filter((t) => t.id !== id);
    setTransformations(updated);
    onTransformationsChange(updated);
  };

  const clearTransformations = () => {
    setTransformations([]);
    onTransformationsChange([]);
  };

  const getTransformationLabel = (type: TransformationType): string => {
    const labels: Record<TransformationType, string> = {
      trim: "Trim Whitespace",
      uppercase: "Convert to Uppercase",
      lowercase: "Convert to Lowercase",
      titlecase: "Convert to Title Case",
      "remove-duplicates": "Remove Duplicates",
      "fill-empty": "Fill Empty Cells",
      "find-replace": "Find & Replace",
      "split-column": "Split Column",
      "merge-columns": "Merge Columns",
      "convert-type": "Convert Data Type",
    };
    return labels[type] || type;
  };

  const quickTransformations: Array<{
    type: TransformationType;
    label: string;
    requiresColumn: boolean;
  }> = [
    { type: "trim", label: "Trim", requiresColumn: true },
    { type: "uppercase", label: "UPPERCASE", requiresColumn: true },
    { type: "lowercase", label: "lowercase", requiresColumn: true },
    { type: "titlecase", label: "Title Case", requiresColumn: true },
    {
      type: "remove-duplicates",
      label: "Remove Duplicates",
      requiresColumn: false,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Transformations</CardTitle>
        <CardDescription>
          Apply OpenRefine-style transformations to your data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Column Selection and Stats */}
        <div className="space-y-2">
          <label className="font-medium text-sm">Select Column</label>
          <Select value={selectedColumn} onValueChange={setSelectedColumn}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a column to transform" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header) => {
                const stats = columnStats.find((s) => s.name === header);
                return (
                  <SelectItem key={header} value={header}>
                    <div className="flex items-center gap-2">
                      <span>{header}</span>
                      {stats && (
                        <Badge variant="outline" className="text-xs">
                          {stats.dataType}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {selectedColumn && columnStats.length > 0 && (
            <div className="rounded-md border p-3 text-sm">
              {(() => {
                const stats = columnStats.find(
                  (s) => s.name === selectedColumn,
                );
                if (!stats) return null;
                return (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Unique values:
                      </span>
                      <span className="font-medium">{stats.uniqueCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Empty cells:
                      </span>
                      <span className="font-medium">{stats.emptyCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data type:</span>
                      <Badge variant="secondary">{stats.dataType}</Badge>
                    </div>
                    {stats.sampleValues.length > 0 && (
                      <div className="mt-2">
                        <span className="text-muted-foreground">
                          Sample values:
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {stats.sampleValues.map((value, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {value.length > 20
                                ? `${value.substring(0, 20)}...`
                                : value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Quick Transformations */}
        <div className="space-y-2">
          <label className="font-medium text-sm">Quick Transformations</label>
          <div className="flex flex-wrap gap-2">
            {quickTransformations.map((qt) => (
              <Button
                key={qt.type}
                size="sm"
                variant="outline"
                disabled={qt.requiresColumn && !selectedColumn}
                onClick={() => {
                  if (qt.requiresColumn && selectedColumn) {
                    addTransformation({
                      type: qt.type,
                      columnId: selectedColumn,
                      applied: false,
                    });
                  } else if (!qt.requiresColumn) {
                    addTransformation({
                      type: qt.type,
                      columnId: "",
                      applied: false,
                    });
                  }
                }}
              >
                {qt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Transformations */}
        <div className="space-y-2">
          <label className="font-medium text-sm">
            Advanced Transformations
          </label>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            disabled={!selectedColumn}
            onClick={() => setShowTransformDialog(true)}
          >
            Add Advanced Transformation
          </Button>
        </div>

        {/* Applied Transformations */}
        {transformations.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-sm">
                Applied Transformations ({transformations.length})
              </label>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearTransformations}
                className="h-8"
              >
                <Undo2 className="mr-1 h-3 w-3" />
                Clear All
              </Button>
            </div>
            <div className="space-y-2">
              {transformations.map((transformation, index) => (
                <div
                  key={transformation.id}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium text-sm">
                        {getTransformationLabel(transformation.type)}
                      </span>
                    </div>
                    {transformation.columnId && (
                      <div className="mt-1 text-muted-foreground text-xs">
                        Column: {transformation.columnId}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeTransformation(transformation.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {showTransformDialog && selectedColumn && (
        <TransformationDialog
          open={showTransformDialog}
          onOpenChange={setShowTransformDialog}
          columnName={selectedColumn}
          allColumns={headers}
          onAdd={addTransformation}
        />
      )}
    </Card>
  );
}
