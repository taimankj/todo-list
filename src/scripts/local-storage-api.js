import { parseTasksForStorage, convertToObject } from "./json-handling.js";
import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";

const projectTitleStorage = "projects";
const projectTitleArr = "projectTitles";

// creates an array in local storage to track what projects are made
// also used to maintain order of projects by added
function initializeProjTracker() {
  localStorage.setItem(
    projectTitleStorage,
    JSON.stringify({
      projectTitles: [],
    }),
  );
}

function checkDuplicateProject(project) {
  let projects = JSON.parse(localStorage.getItem(projectTitleStorage));
  if (!projects[projectTitleArr].includes(project.title)) {
    return false;
  }
  return true;
}

function storeProject(project) {
  let storageInitialized = Boolean(localStorage.getItem(projectTitleStorage));

  if (!storageInitialized) {
    initializeProjTracker();
  }

  localStorage.setItem(project.title, parseTasksForStorage(project.tasks));

  let projects = JSON.parse(localStorage.getItem(projectTitleStorage));

  if (!projects[projectTitleArr].includes(project.title)) {
    projects[projectTitleArr].push(project.title);
    localStorage.setItem(projectTitleStorage, JSON.stringify(projects));
  }
}

function getLatestProject() {
  let projects = JSON.parse(localStorage.getItem(projectTitleStorage));
  let latestProj =
    projects[projectTitleArr][projects[projectTitleArr].length - 1];
  return grabProject(latestProj);
}

function deleteProject(project) {
  let projectTitle = project.title;
  let projects = JSON.parse(localStorage.getItem(projectTitleStorage));
  let projDeleted = projects[projectTitleArr].filter(
    (proj) => !(proj === projectTitle),
  );
  projects[projectTitleArr] = projDeleted;

  localStorage.setItem(projectTitleStorage, JSON.stringify(projects));
  localStorage.removeItem(projectTitle);
}

function checkForProjects() {
  let projects = JSON.parse(localStorage.getItem(projectTitleStorage));
  return projects[projectTitleArr].length > 0;
}

// returns array of project titles
function grabProjectTitles() {
  return JSON.parse(localStorage.getItem(projectTitleStorage))[projectTitleArr];
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

export {
  storeProject,
  deleteProject,
  grabProjectTitles,
  getLatestProject,
  grabProject,
  checkForProjects,
  initializeProjTracker,
  checkDuplicateProject,
};
