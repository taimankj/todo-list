import {
  grabProject,
  getLatestProject,
  deleteProject,
  checkForProjects,
} from "./local-storage-api.js";
import { renderProject, clearProjectPane } from "./dom-rendering.js";

function configureTask(
  task,
  taskContainer,
  taskInfo,
  taskTitle,
  taskDate,
  taskPriority,
  taskDescription,
) {
  taskContainer.className = "task-container";
  taskInfo.className = "task-info";
  taskTitle.className = "task-title";
  taskDate.className = "task-date";
  taskPriority.classList.add("task-priority", `priority-${task.priority}`);
  taskDescription.className = "task-description";

  taskTitle.innerText = task.title;
  taskDate.innerText = task.date;
  taskPriority.innerText = ".";
  taskDescription.innerText = task.description;
}

function configureProjInput(projBox) {
  projBox.setAttribute("type", "text");
  projBox.setAttribute("minlength", "1");
  projBox.setAttribute("maxlength", "10");
  projBox.required = true;
  projBox.id = "new-project";
}

function configureProjDeleteButton(delBtn) {
  delBtn.className = "del-proj-btn";
  delBtn.addEventListener("click", (e) => {
    // grab proj container
    const projContainer = e.currentTarget.parentElement;

    // grab proj from storage
    let projTitle = projContainer.querySelector("p").innerText;
    const projToDel = grabProject(projTitle);

    // del proj from storage
    deleteProject(projToDel);

    // remove proj element from proj list
    projContainer.parentElement.removeChild(projContainer);

    // if, proj deleted was last in storage, clear proj pane
    // else, load next proj
    if (checkForProjects()) {
      const nextProj = getLatestProject();
      renderProject(nextProj);
    } else {
      clearProjectPane();
    }
  });
}

function configureProjEdit(renameProjectBox, projTitle) {
  renameProjectBox.setAttribute("type", "text");
  renameProjectBox.setAttribute("minlength", "1");
  renameProjectBox.setAttribute("maxlength", "10");
  renameProjectBox.value = projTitle.innerText;
  renameProjectBox.required = true;
  renameProjectBox.id = "rename-project";
}

export {
  configureTask,
  configureProjInput,
  configureProjDeleteButton,
  configureProjEdit,
};
