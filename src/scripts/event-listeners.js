import {
  grabProject,
  storeProject,
  checkDuplicateProject,
  changeProjTitle,
  deleteProject,
  getLatestProject,
  checkForProjects,
  removeTaskFromStorage,
} from "./local-storage-api.js";

import {
  removeProjectSubmission,
  renderProject,
  appendTask,
  loadProjectsIntoNav,
  appendProjectSubmission,
  renderProjectEdit,
  reloadProjectEdit,
  clearProjectPane,
  appendTaskSubmission,
  removeTaskSubmission,
  removeTask,
  editTask,
  removeEditTask,
  changeTaskCard,
} from "./dom-rendering.js";

import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";

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

  const fireAddTask = (addTaskBtn) => {
    addTaskBtn.addEventListener("click", (e) => {
      const { confirmBtn, cancelBtn } = appendTaskSubmission();

      addTaskBtn.disabled = true;

      confirmBtn.addEventListener("click", (e) => {
        const taskForm = e.currentTarget.form;
        if (taskForm) {
          const formData = new FormData(taskForm);
          const taskData = Object.fromEntries(formData.entries());
          const currProj = grabProject(
            document.querySelector(".project-title").innerText,
          );

          if (!isTaskFormEmpty(taskData)) {
            const newTask = new Task(
              taskData["task-title"],
              taskData["task-date"],
              taskData["task-priority"],
              taskData["task-description"],
            );
            currProj.addTask(newTask);
            storeProject(currProj);
            removeTaskSubmission();
            addTaskBtn.disabled = false;
            appendTask(newTask);
          } else {
            alert("All fields are required");
          }
        }
      });

      cancelBtn.addEventListener("click", (e) => {
        removeTaskSubmission();
        addTaskBtn.disabled = false;
      });
    });
  };

  const fireDeleteTask = (delTaskBtn) => {
    delTaskBtn.addEventListener("click", () => {
      const taskContainer = delTaskBtn.parentElement.parentElement;
      const projTitle = document.querySelector(".project-title").innerText;
      const taskID = delTaskBtn.value;
      removeTask(taskContainer); // removes task from DOM
      removeTaskFromStorage(projTitle, taskID);
    });
  };

  const fireEditTask = (editTaskBtn) => {
    editTaskBtn.addEventListener("click", (e) => {
      const currentTaskCard = editTaskBtn.parentElement.parentElement;
      const taskID = e.currentTarget.value;

      const { formID, confirmBtn, cancelBtn } = editTask(
        taskID,
        currentTaskCard,
      );

      removeTask(currentTaskCard);
    });
  };

  const fireConfirmEdit = (confirmBtn, taskCard, taskID, formID) => {
    confirmBtn.addEventListener("click", (e) => {
      const taskForm = e.currentTarget.form;

      if (taskForm) {
        const formData = new FormData(taskForm);
        const taskData = Object.fromEntries(formData.entries());
        const currProj = grabProject(
          document.querySelector(".project-title").innerText,
        );

        if (!isTaskFormEmpty(taskData)) {
          let title = taskData["task-title"];
          let date = taskData["task-date"];
          let priority = taskData["task-priority"];
          let description = taskData["task-description"];

          currProj.editTask(taskID, title, date, priority, description);
          storeProject(currProj);
          changeTaskCard(taskCard, title, date, priority, description);
          removeEditTask(document.querySelector(`#${formID}`), taskCard);
        } else {
          alert("All fields are required");
        }
      }
    });
  };

  const fireCancelEdit = (cancelBtn, taskCard, formID) => {
    cancelBtn.addEventListener("click", (e) => {
      removeEditTask(document.querySelector(`#${formID}`), taskCard);
    });
  };

  return {
    enableProjectSelection,
    fireEditProject,
    fireAddProject,
    fireDeleteProject,
    fireAddTask,
    fireDeleteTask,
    fireEditTask,
    fireConfirmEdit,
    fireCancelEdit,
  };
})();

function isTaskFormEmpty(taskData) {
  return (
    taskData["task-date"] === "" ||
    taskData["task-description"] === "" ||
    taskData["task-title"] === "Task Title"
  );
}
