import "./styles.css";
import "./task-card-styles.css";
import { Project } from "./scripts/classes/project.js";
import { Task } from "./scripts/classes/task.js";
import { initializeDefault } from "./scripts/initialize-default.js";
import { renderProject, loadProjects } from "./scripts/dom-rendering.js";
import { grabProject } from "./scripts/local-storage-api.js";

initializeDefault();
loadProjects();
renderProject(grabProject("misc"));
