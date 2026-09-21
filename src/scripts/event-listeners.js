import {
  grabProject,
  storeProject,
  checkDuplicateProject,
  changeProjTitle,
  deleteProject,
  getLatestProject,
  checkForProjects,
} from "./local-storage-api.js";

import {
  removeProjectSubmission,
  renderProject,
  loadProjectsIntoNav,
  appendProjectSubmission,
  renderProjectEdit,
  reloadProjectEdit,
  clearProjectPane,
} from "./dom-rendering.js";

import { Project } from "./classes/project.js";

export const events = (() => {
  const enableProjectSelection = (project) => {
    project.addEventListener("click", (e) => {
      // grab proj title
      let projTitle = project.innerText;

      // grab proj
      const selectedProj = grabProject(projTitle);

      // render proj
      renderProject(selectedProj);
    });
  };

  const fireEditProject = (editProjBtn) => {
    editProjBtn.addEventListener("click", (e) => {
      const { renameProjectBox, projTitle, editProjBtn } = renderProjectEdit();
      let projEntered = false;

      renameProjectBox.focus();

      renameProjectBox.addEventListener("focusout", (e) => {
        if (!projEntered) {
          reloadProjectEdit(projTitle, editProjBtn);
        }
      });

      renameProjectBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          projEntered = true;
          let newTitle = renameProjectBox.value;

          if (!checkDuplicateProject(newTitle)) {
            changeProjTitle(projTitle.innerText, newTitle);
            projTitle.innerText = newTitle;
            reloadProjectEdit(projTitle, editProjBtn);
            loadProjectsIntoNav();
          } else {
            alert("Duplicate entered or same project entered");
            reloadProjectEdit(projTitle, editProjBtn);
          }
        }
      });
    });
  };

  const fireAddProject = (newProjBtn) => {
    newProjBtn.addEventListener("click", (e) => {
      appendProjectSubmission();
      const inputBox = document.querySelector("#new-project");
      let projEntered = false;

      newProjBtn.disabled = true;
      inputBox.focus();

      inputBox.addEventListener("focusout", (e) => {
        newProjBtn.disabled = false;
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
          renderProject(newProj);
          loadProjectsIntoNav();
        }
      });
    });
  };

  const fireDeleteProject = (delProjBtn) => {
    delProjBtn.addEventListener("click", (e) => {
      const projContainer = e.currentTarget.parentElement;

      let projTitle = projContainer.querySelector("p").innerText;
      const projToDel = grabProject(projTitle);

      deleteProject(projToDel);

      projContainer.parentElement.removeChild(projContainer);

      if (checkForProjects()) {
        const nextProj = getLatestProject();
        renderProject(nextProj);
      } else {
        clearProjectPane();
      }
    });
  };

  return {
    enableProjectSelection,
    fireEditProject,
    fireAddProject,
    fireDeleteProject,
  };
})();
