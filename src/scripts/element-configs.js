import {
  grabProject,
  getLatestProject,
  deleteProject,
  checkForProjects,
} from "./local-storage-api.js";
import { renderProject, clearProjectPane } from "./dom-rendering.js";
import { events } from "./event-listeners.js";

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
  taskContainer.id = task.title.split(" ").join("-");
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

  events.fireDeleteProject(delBtn);
}

function configureProjEdit(renameProjectBox, projTitle) {
  renameProjectBox.setAttribute("type", "text");
  renameProjectBox.setAttribute("minlength", "1");
  renameProjectBox.setAttribute("maxlength", "10");
  renameProjectBox.value = projTitle.innerText;
  renameProjectBox.required = true;
  renameProjectBox.id = "rename-project";
}

function configureNewTaskForm(form) {
  form.innerHTML = `
            <div id="task-submission-info">
              <input
                id="task-title-submit"
                name="task-title"
                type="text"
                value="Task Title"
              />
              <input id="task-date-submit" name="task-date" type="date" />
              <select id="task-priority-submit" name="task-priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              <textarea
                  cols="50"
                  rows="10"
                  placeholder="enter task description"
                  id="task-description-submit"
                  name="task-description"
                ></textarea>
            </div>
            <fieldset id="task-submission-actions">
              <button id="confirm-task-submission" form="task-submission" type="button">Submit</button>
              <button id="cancel-task-submission" type="button">Cancel</button>
            </fieldset>`;
  form.id = "task-submission";
}

function configureTaskEditForm(form, taskCard) {
  const formID = `task-${taskCard.querySelector(".task-title").innerText.split(" ").join("-")}-edit`;
  const title = taskCard.querySelector(".task-title").innerText;
  const date = taskCard.querySelector(".task-date").innerText;
  const priority = defaultPriority(taskCard.querySelector(".task-priority"));
  const description = taskCard.querySelector(".task-description").innerText;

  form.id = formID;
  form.innerHTML = `
            <div id="task-submission-info">
              <input
                id="task-title-submit"
                name="task-title"
                type="text"
                value="${title}"
              />
              <input id="task-date-submit" name="task-date" type="date" value="${date}" />
              <select id="task-priority-submit" name="task-priority">${priority}</select>
              <textarea
                  cols="50"
                  rows="10"
                  placeholder="${description}"
                  id="task-description-submit"
                  name="task-description"
                >${description}</textarea>
            </div>
            <fieldset id="task-submission-actions">
              <button id="confirm-task-edit" form="${formID}" type="button">Submit</button>
              <button id="cancel-task-edit" type="button">Cancel</button>
            </fieldset>`;
}

function defaultPriority(priorityElement) {
  switch (priorityElement.classList[1]) {
    case "priority-low":
      return `<option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>`;
      break;
    case "priority-medium":
      return `<option value="low">Low</option>
      <option value="medium" selected>Medium</option>
      <option value="high">High</option>`;
      break;
    case "priority-high":
      return `<option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high" selected>High</option>`;
      break;
    default:
      break;
  }
}

export {
  configureTask,
  configureProjInput,
  configureProjDeleteButton,
  configureProjEdit,
  configureNewTaskForm,
  configureTaskEditForm,
};
