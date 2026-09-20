import "./styles.css";
import "./project-list-styles.css";
import "./task-card-styles.css";
import "./input-styling.css";
import { Project } from "./scripts/classes/project.js";
import { Task } from "./scripts/classes/task.js";
import { initializeDefault } from "./scripts/initialize-default.js";
import {
  removeProjectSubmission,
  renderProject,
  loadProjects,
  appendProjectSubmission,
  renderProjectEdit,
} from "./scripts/dom-rendering.js";
import {
  grabProject,
  storeProject,
  checkDuplicateProject,
} from "./scripts/local-storage-api.js";

initializeDefault();
loadProjects();
renderProject(grabProject("misc"));

const newProj = document.querySelector("#new-project-btn");
const editProj = document.querySelector("#edit-project");

newProj.addEventListener("click", (e) => {
  appendProjectSubmission();
  const inputBox = document.querySelector("#new-project");
  let projEntered = false;

  newProj.disabled = true;
  inputBox.focus();

  inputBox.addEventListener("focusout", (e) => {
    newProj.disabled = false;
    if (!projEntered) {
      removeProjectSubmission();
    }
  });

  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      projEntered = true;
      let projTitle = e.currentTarget.value;
      const newProj = new Project(projTitle);

      if (checkDuplicateProject(newProj)) {
        alert("No duplicates allowed");
        removeProjectSubmission();
        return;
      }

      storeProject(newProj);
      renderProject(grabProject(projTitle));
      loadProjects();
    }
  });
});

editProj.addEventListener("click", (e) => {
  const { renameProjectBox, projTitle, editProjBtn } = renderProjectEdit();
  let projEntered = false;

  renameProjectBox.focus();
});
