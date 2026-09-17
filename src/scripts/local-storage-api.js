import { parseTasks } from "./json-handling.js";

function storeProject(project) {
  localStorage.setItem(project.title, parseTasks(project.tasks));
}

function clearStorage() {
  localStorage.removeItem("misc");
}

export { storeProject, clearStorage };
