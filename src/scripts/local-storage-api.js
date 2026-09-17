import { parseTasksForStorage, convertToObject } from "./json-handling.js";
import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";

function storeProject(project) {
  localStorage.setItem(project.title, parseTasksForStorage(project.tasks));
}

function clearStorage() {
  localStorage.removeItem("misc");
}

// returns array of project titles
function grabProjectTitles() {
  let projects = [];

  for (let i = 0; i < localStorage.length; i++) {
    projects.push(localStorage.key(i));
  }

  return projects;
}

// returns queried project
function grabProject(projectTitle) {
  for (let i = 0; i < localStorage.length; i++) {
    const currProject = localStorage.key(i);
    if (projectTitle === currProject) {
      return convertToProject(projectTitle, localStorage.getItem(currProject));
    }
  }
}

function convertToProject(projectTitle, tasks) {
  const project = new Project(projectTitle);

  const projectTasks = convertToObject(tasks);

  for (const [taskName, taskInfo] of Object.entries(projectTasks)) {
    const currTask = new Task(taskName);
    currTask.date = taskInfo[0];
    currTask.priority = taskInfo[1];
    currTask.description = taskInfo[2];

    project.addTask(currTask);
  }

  return project;
}

export { storeProject, clearStorage, grabProjectTitles, grabProject };
