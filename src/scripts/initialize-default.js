import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";
import { storeProject } from "./local-storage-api.js";

export function initializeDefault() {
  const misc = new Project("misc");
  const payBillTask = new Task(
    "pay bill",
    "2026-09-15",
    "high",
    "pay auto loan bill",
    misc,
  );
  misc.addTask(payBillTask);

  storeProject(misc);
}
