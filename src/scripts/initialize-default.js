import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";
import { storeProject } from "./local-storage-api.js";
import { renderProject } from "./dom-rendering.js";

function initializeDefaultProject() {
  const misc = new Project("misc");
  const miscTasks = [
    new Task(
      "pay bill",
      "2026-09-15",
      "high",
      "Pay the monthly auto loan bill. Make sure the payment is submitted before the due date to avoid any late fees.",
      misc,
    ),

    new Task(
      "buy groceries",
      "2026-09-18",
      "medium",
      "Pick up groceries for the upcoming week. Check the fridge and pantry first so unnecessary items are not purchased.",
      misc,
    ),

    new Task(
      "wash car",
      "2026-09-20",
      "low",
      "Wash the outside of the car and clean the windows. Vacuum the interior and remove any trash from the seats and floor.",
      misc,
    ),
  ];
  misc.tasks = miscTasks;

  storeProject(misc);
  renderProject(misc);
}

export { initializeDefaultProject };
