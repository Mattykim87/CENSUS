import { type Task } from "@/db/schema";

/**
 * Converts task data to CSV format
 */
export function convertTasksToCSV(tasks: Task[]): string {
  if (!tasks.length) return "";

  // Define the headers we want to include in the CSV
  const headers = [
    "code",
    "title",
    "status",
    "label",
    "priority",
    "estimatedHours",
    "description",
    "dueDate",
    "createdAt",
  ];

  // Create the header row
  const headerRow = headers.join(",");

  // Create data rows
  const rows = tasks.map((task) => {
    return headers
      .map((header) => {
        const value = task[header as keyof Task];
        
        // Handle dates
        if (value instanceof Date) {
          return `"${value.toISOString()}"`;
        }
        
        // Handle strings with commas by quoting them
        if (typeof value === "string" && value.includes(",")) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        
        // Return the value as is or empty string if undefined
        return value !== undefined ? String(value) : "";
      })
      .join(",");
  });

  // Combine header and rows
  return [headerRow, ...rows].join("\n");
}

/**
 * Parse CSV string into an array of objects
 */
export function parseCSV(csvString: string): Record<string, string>[] {
  // Split by line
  const lines = csvString.split(/\r?\n/);
  if (lines.length < 2) return [];

  // Extract headers from the first line
  const headers = parseCSVRow(lines[0] || "");

  // Parse data rows
  return lines.slice(1).map((line) => {
    if (!line || !line.trim()) return {};
    
    const values = parseCSVRow(line);
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      record[header] = values[index] || "";
    });

    return record;
  }).filter(record => Object.keys(record).length > 0);
}

/**
 * Parse a single CSV row, handling quoted values properly
 */
function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let insideQuotes = false;
  let currentValue = "";

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"') {
      // Handle escaped quotes (two quotes in a row)
      if (nextChar === '"') {
        currentValue += '"';
        i++; // Skip next quote
      } else {
        // Toggle inside quotes state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of field
      result.push(currentValue);
      currentValue = "";
    } else {
      // Add character to current value
      currentValue += char;
    }
  }

  // Add the last field
  result.push(currentValue);
  return result;
}

/**
 * Converts CSV data to Task objects
 */
export function csvToTaskData(
  csvData: Record<string, string>[]
): Partial<Task>[] {
  return csvData.map((row) => {
    return {
      title: row.title || row.name || Object.values(row)[0] || "Imported CSV Item",
      status: validateStatus(row.status),
      label: validateLabel(row.label || row.type),
      priority: validatePriority(row.priority),
      description: row.description || row.details || row.notes || "",
      estimatedHours: parseFloat(row.estimatedHours || row.hours || "0") || 0,
    };
  });
}

/**
 * Validate status value against allowed enum values
 */
function validateStatus(status?: string): Task["status"] {
  if (!status) return "todo";
  
  const normalized = status.toLowerCase();
  
  if (normalized.includes("progress") || normalized.includes("doing")) {
    return "in-progress";
  } else if (normalized.includes("done") || normalized.includes("complete")) {
    return "done";
  } else if (normalized.includes("cancel")) {
    return "canceled";
  }
  
  return "todo";
}

/**
 * Validate label value against allowed enum values
 */
function validateLabel(label?: string): Task["label"] {
  if (!label) return "feature";
  
  const normalized = label.toLowerCase();
  
  if (normalized.includes("bug") || normalized.includes("issue")) {
    return "bug";
  } else if (normalized.includes("enhance")) {
    return "enhancement";
  } else if (normalized.includes("doc")) {
    return "documentation";
  }
  
  return "feature";
}

/**
 * Validate priority value against allowed enum values
 */
function validatePriority(priority?: string): Task["priority"] {
  if (!priority) return "medium";
  
  const normalized = priority.toLowerCase();
  
  if (normalized.includes("high") || normalized.includes("critical")) {
    return "high";
  } else if (normalized.includes("low")) {
    return "low";
  }
  
  return "medium";
}
