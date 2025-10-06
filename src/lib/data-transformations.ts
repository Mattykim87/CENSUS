/**
 * Data transformation utilities for OpenRefine-like functionality
 */

export type TransformationType =
  | "trim"
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "remove-duplicates"
  | "fill-empty"
  | "find-replace"
  | "split-column"
  | "merge-columns"
  | "convert-type";

export interface Transformation {
  id: string;
  type: TransformationType;
  columnId: string;
  params?: Record<string, unknown>;
  applied: boolean;
}

export interface ColumnStats {
  name: string;
  uniqueCount: number;
  emptyCount: number;
  totalCount: number;
  dataType: "string" | "number" | "date" | "mixed";
  sampleValues: string[];
}

/**
 * Analyze column data and return statistics
 */
export function analyzeColumn(
  data: Record<string, string>[],
  columnName: string,
): ColumnStats {
  const values = data.map((row) => row[columnName] || "");
  const totalCount = values.length;
  const emptyCount = values.filter((v) => !v || v.trim() === "").length;
  const uniqueValues = new Set(values.filter((v) => v && v.trim() !== ""));
  const uniqueCount = uniqueValues.size;

  // Sample up to 5 unique values
  const sampleValues = Array.from(uniqueValues).slice(0, 5);

  // Detect data type
  let dataType: "string" | "number" | "date" | "mixed" = "string";
  const nonEmpty = values.filter((v) => v && v.trim() !== "");

  if (nonEmpty.length > 0) {
    const allNumbers = nonEmpty.every((v) => !Number.isNaN(Number(v)));
    const allDates = nonEmpty.every((v) => !Number.isNaN(Date.parse(v)));

    if (allNumbers) {
      dataType = "number";
    } else if (allDates && !allNumbers) {
      dataType = "date";
    } else {
      // Check if it's mixed
      const someNumbers = nonEmpty.some((v) => !Number.isNaN(Number(v)));
      const someDates = nonEmpty.some((v) => !Number.isNaN(Date.parse(v)));
      if (someNumbers || someDates) {
        dataType = "mixed";
      }
    }
  }

  return {
    name: columnName,
    uniqueCount,
    emptyCount,
    totalCount,
    dataType,
    sampleValues,
  };
}

/**
 * Apply trim transformation to column
 */
export function trimColumn(
  data: Record<string, string>[],
  columnName: string,
): Record<string, string>[] {
  return data.map((row) => ({
    ...row,
    [columnName]: (row[columnName] || "").trim(),
  }));
}

/**
 * Apply uppercase transformation to column
 */
export function uppercaseColumn(
  data: Record<string, string>[],
  columnName: string,
): Record<string, string>[] {
  return data.map((row) => ({
    ...row,
    [columnName]: (row[columnName] || "").toUpperCase(),
  }));
}

/**
 * Apply lowercase transformation to column
 */
export function lowercaseColumn(
  data: Record<string, string>[],
  columnName: string,
): Record<string, string>[] {
  return data.map((row) => ({
    ...row,
    [columnName]: (row[columnName] || "").toLowerCase(),
  }));
}

/**
 * Apply title case transformation to column
 */
export function titlecaseColumn(
  data: Record<string, string>[],
  columnName: string,
): Record<string, string>[] {
  return data.map((row) => ({
    ...row,
    [columnName]: (row[columnName] || "")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));
}

/**
 * Remove duplicate rows based on all columns
 */
export function removeDuplicateRows(
  data: Record<string, string>[],
): Record<string, string>[] {
  const seen = new Set<string>();
  return data.filter((row) => {
    const key = JSON.stringify(row);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Fill empty cells in a column with a default value
 */
export function fillEmptyCells(
  data: Record<string, string>[],
  columnName: string,
  fillValue: string,
): Record<string, string>[] {
  return data.map((row) => ({
    ...row,
    [columnName]:
      !row[columnName] || row[columnName].trim() === ""
        ? fillValue
        : row[columnName],
  }));
}

/**
 * Find and replace in a column
 */
export function findReplace(
  data: Record<string, string>[],
  columnName: string,
  findText: string,
  replaceText: string,
  caseSensitive = false,
): Record<string, string>[] {
  return data.map((row) => {
    const value = row[columnName] || "";
    if (caseSensitive) {
      return {
        ...row,
        [columnName]: value.split(findText).join(replaceText),
      };
    }
    const regex = new RegExp(findText, "gi");
    return {
      ...row,
      [columnName]: value.replace(regex, replaceText),
    };
  });
}

/**
 * Split a column into multiple columns
 */
export function splitColumn(
  data: Record<string, string>[],
  columnName: string,
  separator: string,
  newColumnNames: string[],
): Record<string, string>[] {
  return data.map((row) => {
    const value = row[columnName] || "";
    const parts = value.split(separator);
    const newColumns: Record<string, string> = {};

    newColumnNames.forEach((newName, index) => {
      newColumns[newName] = parts[index] || "";
    });

    return { ...row, ...newColumns };
  });
}

/**
 * Merge multiple columns into one
 */
export function mergeColumns(
  data: Record<string, string>[],
  columnNames: string[],
  newColumnName: string,
  separator: string,
): Record<string, string>[] {
  return data.map((row) => {
    const values = columnNames.map((col) => row[col] || "");
    return {
      ...row,
      [newColumnName]: values.join(separator),
    };
  });
}

/**
 * Apply a transformation to the data
 */
export function applyTransformation(
  data: Record<string, string>[],
  transformation: Transformation,
): Record<string, string>[] {
  switch (transformation.type) {
    case "trim":
      return trimColumn(data, transformation.columnId);
    case "uppercase":
      return uppercaseColumn(data, transformation.columnId);
    case "lowercase":
      return lowercaseColumn(data, transformation.columnId);
    case "titlecase":
      return titlecaseColumn(data, transformation.columnId);
    case "remove-duplicates":
      return removeDuplicateRows(data);
    case "fill-empty":
      return fillEmptyCells(
        data,
        transformation.columnId,
        (transformation.params?.fillValue as string) || "",
      );
    case "find-replace":
      return findReplace(
        data,
        transformation.columnId,
        (transformation.params?.findText as string) || "",
        (transformation.params?.replaceText as string) || "",
        (transformation.params?.caseSensitive as boolean) || false,
      );
    case "split-column":
      return splitColumn(
        data,
        transformation.columnId,
        (transformation.params?.separator as string) || ",",
        (transformation.params?.newColumnNames as string[]) || [],
      );
    case "merge-columns":
      return mergeColumns(
        data,
        (transformation.params?.columnNames as string[]) || [],
        transformation.columnId,
        (transformation.params?.separator as string) || " ",
      );
    default:
      return data;
  }
}

/**
 * Apply multiple transformations in sequence
 */
export function applyTransformations(
  data: Record<string, string>[],
  transformations: Transformation[],
): Record<string, string>[] {
  return transformations.reduce((acc, transformation) => {
    return applyTransformation(acc, transformation);
  }, data);
}
