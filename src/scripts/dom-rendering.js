// script will parse projects and tasks from localStorage
import { grabProjectTitles } from "./local-storage-api.js";

// get project in localStorage
// render project and associated tasks onto main pane
function renderProject(project) {
  const projectTitleContainer = document.querySelector(".project-title");
  projectTitleContainer.innerText = project.title;

  const tasksContainer = document.querySelector(".project-tasks");

  project.tasks.forEach((task) => {
    const taskRootContainer = document.createElement("article");
    const taskInfoContainer = document.createElement("article");
    const taskTitleContainer = document.createElement("h5");
    const dateContainer = document.createElement("p");
    const priorityContainer = document.createElement("p");
    const descriptionContainer = document.createElement("p");

    taskRootContainer.className = "task-container";
    taskInfoContainer.className = "task-info";
    taskTitleContainer.className = "task-title";
    dateContainer.className = "task-date";
    priorityContainer.classList.add(
      "task-priority",
      `priority-${task.priority}`,
    );
    descriptionContainer.className = "task-description";

    taskTitleContainer.innerText = task.title;
    dateContainer.innerText = task.date;
    priorityContainer.innerText = task.priority;
    descriptionContainer.innerText = task.description;

    taskInfoContainer.appendChild(taskTitleContainer);
    taskInfoContainer.appendChild(dateContainer);
    taskInfoContainer.appendChild(priorityContainer);
    taskInfoContainer.appendChild(descriptionContainer);
    taskRootContainer.appendChild(taskInfoContainer);

    appendTaskActions(taskRootContainer);

    tasksContainer.appendChild(taskRootContainer);
  });
}

function appendTaskActions(taskContainer) {
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
  editTask.className = "edit-task-btn";

  buttonContainer.appendChild(viewMore);
  buttonContainer.appendChild(editTask);
  buttonContainer.appendChild(deleteTask);
  taskContainer.appendChild(buttonContainer);
}

// loads projects onto nav bar
function loadProjects() {
  // grab project titles from localStorage
  const projects = grabProjectTitles();
  const projectNavContainer = document.querySelector(".my-projects");

  projects.forEach((projectTitle) => {
    const projectTitleContainer = document.createElement("li");
    projectTitleContainer.innerText = projectTitle;
    projectNavContainer.appendChild(projectTitleContainer);
  });
}

export { renderProject, loadProjects };
