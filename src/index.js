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
  removeProjectSubmission,
} from "./scripts/dom-rendering.js";
import {
  grabProject,
  storeProject,
  deleteProject,
} from "./scripts/local-storage-api.js";

initializeDefault();
loadProjects();
renderProject(grabProject("misc"));

const newProj = document.querySelector("#new-project-btn");
const delProj = document.querySelector("#confirm-proj-del");

newProj.addEventListener("click", (e) => {
  appendProjectSubmission();
  const inputBox = document.querySelector("#new-project");
  newProj.disabled = true;

  inputBox.focus();
  inputBox.addEventListener("focusout", (e) => {
    newProj.disabled = false;
    removeProjectSubmission();
  });
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let projTitle = e.target.value;
      const newProj = new Project(projTitle);
      storeProject(newProj);
      renderProject(grabProject(projTitle));

      loadProjects();
    }
  });
});

delProj.addEventListener("click", (e) => {
  // close dialog
  // del proj
  // remove proj from main pain
  // load other projects if any
});
