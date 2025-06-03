import { type Task, tasks } from "@/db/schema";
import { faker } from "@faker-js/faker";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle2,
  CircleHelp,
  CircleIcon,
  CircleX,
  Timer,
} from "lucide-react";
import { customAlphabet } from "nanoid";

import { generateId } from "@/lib/id";

export function generateRandomTask(): Task {
  return {
    id: generateId("task"),
    code: `TASK-${customAlphabet("0123456789", 4)()}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    description: faker.lorem.sentence(),
    estimatedHours: faker.number.int({ min: 1, max: 24 }),
    status: faker.helpers.shuffle(tasks.status.enumValues)[0] ?? "todo",
    label: faker.helpers.shuffle(tasks.label.enumValues)[0] ?? "bug",
    priority: faker.helpers.shuffle(tasks.priority.enumValues)[0] ?? "low",
    dueDate: faker.datatype.boolean({ probability: 0.3 }) 
      ? faker.date.future() 
      : null,
    archived: faker.datatype.boolean({ probability: 0.2 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    // CSV-related fields with default values
    isCSVFile: false,
    csvFilename: null,
    csvHeaders: null,
    csvRowCount: null,
    csvUploadStatus: null,
    csvUploadError: null,
  };
}

export function getStatusIcon(status: Task["status"]) {
  const statusIcons = {
    canceled: CircleX,
    done: CheckCircle2,
    "in-progress": Timer,
    todo: CircleHelp,
  };

  return statusIcons[status] || CircleIcon;
}

export function getPriorityIcon(priority: Task["priority"]) {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  };

  return priorityIcons[priority] || CircleIcon;
}
