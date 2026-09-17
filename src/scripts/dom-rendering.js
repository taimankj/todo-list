// script will parse projects and tasks from localStorage
import { grabProjectTitles } from "./local-storage-api.js";

// get project in localStorage
// render project and associated tasks onto main pane
function renderProject(project) {
  const projectTitleContainer = document.querySelector(".project-title");
  projectTitleContainer.innerText = project.title;

  const tasksContainer = document.querySelector(".project-tasks");

  project.tasks.forEach((task) => {
    const taskContainer = document.createElement("article");
    const taskTitleContainer = document.createElement("h4");
    const dateContainer = document.createElement("p");
    const priorityContainer = document.createElement("p");
    const descriptionContainer = document.createElement("p");

    taskContainer.className = "task";
    taskTitleContainer.className = "task-title";
    dateContainer.className = "task-date";
    priorityContainer.className = "task-priority";
    descriptionContainer.className = "task-description";

    taskTitleContainer.innerText = task.title;
    dateContainer.innerText = task.date;
    priorityContainer.innerText = task.priority;
    descriptionContainer.innerText = task.description;

    taskContainer.appendChild(taskTitleContainer);
    taskContainer.appendChild(dateContainer);
    taskContainer.appendChild(priorityContainer);
    taskContainer.appendChild(descriptionContainer);
    tasksContainer.appendChild(taskContainer);
  });
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
