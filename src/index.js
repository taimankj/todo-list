import "./styles/styles.css";
import "./styles/project-list-styles.css";
import "./styles/task-card-styles.css";
import "./styles/input-styling.css";
import { Project } from "./scripts/classes/project.js";
import { Task } from "./scripts/classes/task.js";
import { initializeDefaultProject } from "./scripts/initialize-default.js";
import {
  removeProjectSubmission,
  renderProject,
  loadProjectsIntoNav,
  appendProjectSubmission,
  renderProjectEdit,
  reloadProjectEdit,
} from "./scripts/dom-rendering.js";
import {
  grabProject,
  storeProject,
  checkDuplicateProject,
  changeProjTitle,
  initializeStorage,
} from "./scripts/local-storage-api.js";
import { events } from "./scripts/event-listeners.js";

initializeStorage();
initializeDefaultProject();
loadProjectsIntoNav();

const newProj = document.querySelector("#new-project-btn");

events.fireAddProject(newProj);
