import "./styles.css";
import "./project-list-styles.css";
import "./task-card-styles.css";
import "./input-styling.css";
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
// const editProj = document.querySelector("#edit-project");
// const projectsInNav = document.querySelectorAll(".my-projects > li > p");

// projectsInNav.forEach((project) => {
//   events.enableProjectSelection(project);
// });

// editProj.addEventListener("click", (e) => {
//   const { renameProjectBox, projTitle, editProjBtn } = renderProjectEdit();
//   let projEntered = false;

//   renameProjectBox.focus();

//   renameProjectBox.addEventListener("focusout", (e) => {
//     if (!projEntered) {
//       reloadProjectEdit(projTitle, editProjBtn);
//     }
//   });

//   renameProjectBox.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//       projEntered = true;
//       let newTitle = renameProjectBox.value;

//       if (!checkDuplicateProject(newTitle)) {
//         changeProjTitle(projTitle.innerText, newTitle);
//         projTitle.innerText = newTitle;
//         reloadProjectEdit(projTitle, editProjBtn);
//         loadProjects();
//       } else {
//         alert("Duplicate entered or same project entered");
//         reloadProjectEdit(projTitle, editProjBtn);
//       }
//     }
//   });
// });

// newProj.addEventListener("click", (e) => {
//   appendProjectSubmission();
//   const inputBox = document.querySelector("#new-project");
//   let projEntered = false;

//   newProj.disabled = true;
//   inputBox.focus();

//   inputBox.addEventListener("focusout", (e) => {
//     newProj.disabled = false;
//     if (!projEntered) {
//       removeProjectSubmission();
//     }
//   });

//   inputBox.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//       projEntered = true;
//       let projTitle = e.currentTarget.value;
//       const newProj = new Project(projTitle);

//       if (checkDuplicateProject(newProj)) {
//         alert("No duplicates allowed");
//         removeProjectSubmission();
//         return;
//       }

//       storeProject(newProj);
//       renderProject(grabProject(projTitle));
//       loadProjects();
//     }
//   });
// });
