import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";
import { storeProject } from "./local-storage-api.js";

export function initializeDefault() {
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

    new Task(
      "schedule dentist",
      "2026-09-22",
      "medium",
      "Call the dental office to schedule a routine cleaning. Ask about available appointment times and confirm insurance coverage if needed.",
      misc,
    ),

    new Task(
      "finish homework",
      "2026-09-19",
      "high",
      "Complete the JavaScript assignment for class. Review the requirements before submitting to make sure every section is finished.",
      misc,
    ),

    new Task(
      "walk dog",
      "2026-09-17",
      "medium",
      "Take the dog on an evening walk around the neighborhood. Try to give him enough time to exercise and use the bathroom.",
      misc,
    ),

    new Task(
      "clean kitchen",
      "2026-09-21",
      "low",
      "Clean the kitchen counters, sink, and stovetop. Put away any dishes and wipe down the appliances afterward.",
      misc,
    ),

    new Task(
      "renew registration",
      "2026-09-25",
      "high",
      "Renew the vehicle registration before it expires. Verify that the address and vehicle information are correct before completing the renewal.",
      misc,
    ),

    new Task(
      "call insurance",
      "2026-09-23",
      "medium",
      "Call the insurance company to review the current auto policy. Ask whether there are any discounts or lower-rate options available.",
      misc,
    ),

    new Task(
      "take out trash",
      "2026-09-18",
      "low",
      "Gather the trash and recycling from around the house. Take the bins outside and place them by the curb for collection.",
      misc,
    ),
  ];
  misc.tasks = miscTasks;

  storeProject(misc);
}
