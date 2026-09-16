import { Project } from "./scripts/project.js";
import { Task } from "./scripts/task.js";
import { storeProject } from "./scripts/local-storage-api.js";

export function initializeDefault() {
  const misc = new Project("misc");
  const payBillTask = new Task(
    "pay bill",
    "2026-09-15",
    3,
    "pay auto loan bill",
    misc,
  );
  misc.addTask(payBillTask);

  storeProject(misc);
}
