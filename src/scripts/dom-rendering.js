// script will parse projects and tasks from localStorage
import { grabProjectTitles } from "./local-storage-api.js";
import {
  configureTask,
  configureProjInput,
  configureProjDeleteButton,
  configureProjEdit,
  configureNewTaskForm,
  configureTaskEditForm,
} from "./element-configs.js";
import { events } from "./event-listeners.js";

// get project in localStorage
// render project and associated tasks onto main pane

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProject(project) {
  clearProjectPane();

  const projectInfo = document.querySelector(".project-info");
  const projectTitleWrapper = document.createElement("div");
  const projectTitle = document.createElement("h1");
  const editProjBtn = document.createElement("button");
  const newTaskBtn = document.createElement("button");

  projectTitleWrapper.id = "project-title-wrapper";

  projectTitle.className = "project-title";
  projectTitle.innerText = project.title;

  editProjBtn.id = "edit-project";
  editProjBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" fill="currentColor" /></svg>`;
  events.fireEditProject(editProjBtn);

  newTaskBtn.id = "new-task";
  newTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" /></svg>`;
  events.fireAddTask(newTaskBtn);

  renderTasks(project);

  projectTitleWrapper.appendChild(projectTitle);
  projectTitleWrapper.appendChild(editProjBtn);
  projectInfo.appendChild(projectTitleWrapper);
  projectInfo.appendChild(newTaskBtn);
}

function renderTasks(project) {
  const tasksContainer = document.querySelector(".project-tasks");
  removeChildren(tasksContainer);

  project.tasks.toReversed().forEach((task) => {
    const taskContainer = createTaskElement(task);
    tasksContainer.appendChild(taskContainer);
  });
}

function createTaskElement(task) {
  const taskContainer = document.createElement("article");
  const taskInfo = document.createElement("article");
  const taskTitle = document.createElement("h5");
  const taskDate = document.createElement("p");
  const taskPriority = document.createElement("p");
  const taskDescription = document.createElement("p");

  configureTask(
    task,
    taskContainer,
    taskInfo,
    taskTitle,
    taskDate,
    taskPriority,
    taskDescription,
  );

  taskInfo.appendChild(taskTitle);
  taskInfo.appendChild(taskDate);
  taskInfo.appendChild(taskPriority);
  taskInfo.appendChild(taskDescription);
  taskContainer.appendChild(taskInfo);
  appendTaskActions(taskContainer, task);

  return taskContainer;
}

function clearProjectPane() {
  const projectInfo = document.querySelector(".project-info");
  const projTasks = document.querySelector(".project-tasks");

  removeChildren(projectInfo);
  removeChildren(projTasks);
}

function appendTaskActions(taskContainer, task) {
  const buttonContainer = document.createElement("div");
  const viewMore = document.createElement("button");
  const deleteTask = document.createElement("button");
  const editTask = document.createElement("button");

  viewMore.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye</title><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" fill="currentColor" /></svg>`;

  deleteTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" fill="currentColor" /></svg>`;

  editTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" fill="currentColor" /></svg>`;

  buttonContainer.className = "task-actions";

  viewMore.className = "view-task-info-btn";

  deleteTask.className = "delete-task-btn";
  deleteTask.setAttribute("name", "task-id");
  deleteTask.setAttribute("value", task.taskID);
  events.fireDeleteTask(deleteTask);

  editTask.className = "edit-task-btn";
  editTask.setAttribute("name", "task-id");
  editTask.setAttribute("value", task.taskID);
  events.fireEditTask(editTask);

  buttonContainer.appendChild(viewMore);
  buttonContainer.appendChild(editTask);
  buttonContainer.appendChild(deleteTask);
  taskContainer.appendChild(buttonContainer);
}

function loadProjectsIntoNav() {
  // grab project titles from localStorage
  const projects = grabProjectTitles();
  const projectNavContainer = document.querySelector(".my-projects");

  removeChildren(projectNavContainer);

  projects.forEach((projectTitle) => {
    const projectTitleContainer = document.createElement("li");
    const title = document.createElement("p");
    const delBtn = document.createElement("button");

    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" fill="currentColor" /></svg>`;
    title.innerText = projectTitle;

    events.enableProjectSelection(title);

    configureProjDeleteButton(delBtn);

    projectTitleContainer.appendChild(title);
    projectTitleContainer.appendChild(delBtn);

    projectNavContainer.appendChild(projectTitleContainer);
  });
}

function appendProjectSubmission() {
  const projectsPane = document.querySelector(".my-projects");
  const projectInput = createProjectInput();
  projectsPane.appendChild(projectInput);
}

function removeProjectSubmission() {
  const inputWrapper = document.querySelector("#input-wrapper");
  inputWrapper.parentElement.removeChild(inputWrapper);
}

function createProjectInput() {
  const inputWrapper = document.createElement("li");
  const inputBox = document.createElement("input");

  inputWrapper.id = "input-wrapper";
  configureProjInput(inputBox);

  inputWrapper.appendChild(inputBox);
  return inputWrapper;
}

function renderProjectEdit() {
  const projectTitleWrapper = document.querySelector("#project-title-wrapper");
  const renameProjectBox = document.createElement("input");
  const projTitle = document.querySelector(".project-title");
  const editProjBtn = document.querySelector("#edit-project");

  configureProjEdit(renameProjectBox, projTitle);

  removeChildren(projectTitleWrapper);
  projectTitleWrapper.appendChild(renameProjectBox);

  return { renameProjectBox, projTitle, editProjBtn };
}

function reloadProjectEdit(projTitle, editProjBtn) {
  const projectTitleWrapper = document.querySelector("#project-title-wrapper");
  removeChildren(projectTitleWrapper);
  projectTitleWrapper.appendChild(projTitle);
  projectTitleWrapper.appendChild(editProjBtn);
}

function appendTaskSubmission() {
  const tasksContainer = document.querySelector(".project-tasks");

  // grab first task in the list
  const firstTaskReference = document.querySelector(
    ".project-tasks > :first-child",
  );

  // insert input box before that task
  const inputTaskForm = document.createElement("form");
  configureNewTaskForm(inputTaskForm);
  tasksContainer.insertBefore(inputTaskForm, firstTaskReference);

  const confirmBtn = document.querySelector("#confirm-task-submission");
  const cancelBtn = document.querySelector("#cancel-task-submission");
  return { confirmBtn, cancelBtn };
}

function removeTaskSubmission() {
  const tasksContainer = document.querySelector(".project-tasks");
  const inputTaskForm = document.querySelector("#task-submission");
  tasksContainer.removeChild(inputTaskForm);
}

function appendTask(task) {
  const tasksContainer = document.querySelector(".project-tasks");
  const taskContainer = createTaskElement(task);
  const firstTaskReference = document.querySelector(
    ".project-tasks > :first-child",
  );
  tasksContainer.insertBefore(taskContainer, firstTaskReference);
}

function removeTask(taskContainer) {
  const projectTaskContainer = document.querySelector(".project-tasks");
  projectTaskContainer.removeChild(taskContainer);
}

function editTask(taskID, taskCard) {
  const tasksContainer = document.querySelector(".project-tasks");
  const taskCardSibling = taskCard.nextSibling;
  const taskEditForm = document.createElement("form");

  configureTaskEditForm(taskEditForm, taskCard);
  const formID = taskEditForm.id;

  if (taskCardSibling) {
    tasksContainer.insertBefore(taskEditForm, taskCardSibling);
  } else {
    tasksContainer.appendChild(taskEditForm);
  }

  const confirmBtn = taskEditForm.querySelector("#confirm-task-edit");
  const cancelBtn = taskEditForm.querySelector("#cancel-task-edit");

  events.fireConfirmEdit(confirmBtn, taskCard, taskID, formID);
  events.fireCancelEdit(cancelBtn, taskCard, formID);

  return { formID, confirmBtn, cancelBtn };
}

function removeEditTask(form, taskCard) {
  const tasksContainer = document.querySelector(".project-tasks");
  const formSibling = form.nextSibling;

  if (formSibling) {
    tasksContainer.insertBefore(taskCard, formSibling);
  } else {
    tasksContainer.appendChild(taskCard);
  }

  tasksContainer.removeChild(form);
}

function changeTaskCard(taskCard, title, date, priority, description) {
  const taskTitle = taskCard.querySelector(".task-title");
  const taskDate = taskCard.querySelector(".task-date");
  const taskPriority = taskCard.querySelector(".task-priority");
  const taskDescription = taskCard.querySelector(".task-description");

  taskCard.id = title.split(" ").join("-");
  taskTitle.innerText = title;
  taskDate.innerText = date;
  taskPriority.className = "";
  taskPriority.classList.add("task-priority", `priority-${priority}`);
  taskDescription.innerText = description;
}

export {
  renderProject,
  loadProjectsIntoNav,
  clearProjectPane,
  appendProjectSubmission,
  removeProjectSubmission,
  renderProjectEdit,
  reloadProjectEdit,
  appendTaskSubmission,
  removeTaskSubmission,
  appendTask,
  removeTask,
  editTask,
  removeEditTask,
  changeTaskCard,
};
