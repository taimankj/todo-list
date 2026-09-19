import "./styles.css";
import "./project-list-styles.css";
import "./task-card-styles.css";
import "./input-styling.css";
import { Project } from "./scripts/classes/project.js";
import { Task } from "./scripts/classes/task.js";
import { initializeDefault } from "./scripts/initialize-default.js";
import {
  renderProject,
  loadProjects,
  appendProjectSubmission,
} from "./scripts/dom-rendering.js";
import {
  grabProject,
  storeProject,
  initializeProjTracker,
} from "./scripts/local-storage-api.js";

initializeProjTracker();
initializeDefault();
loadProjects();
renderProject(grabProject("misc"));

const newProj = document.querySelector("#new-project-btn");

newProj.addEventListener("click", (e) => {
  appendProjectSubmission();
  const inputBox = document.querySelector("#new-project");
  newProj.disabled = true;

  inputBox.focus();

  inputBox.addEventListener("focusout", (e) => {
    newProj.disabled = false;
    loadProjects();
  });

  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let projTitle = e.currentTarget.value;
      const newProj = new Project(projTitle);
      storeProject(newProj);
      renderProject(grabProject(projTitle));

      loadProjects();
    }
  });
});
