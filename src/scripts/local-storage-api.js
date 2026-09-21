import { parseTasksForStorage, convertToObject } from "./json-handling.js";
import { Project } from "./classes/project.js";
import { Task } from "./classes/task.js";

const projectTitleStorage = "projects";
const projectTitleArr = "projectTitles";
const initState = "init";

function setInitState(state) {
  localStorage.setItem(initState, JSON.stringify(state));
}

function initializeProjTracker() {
  localStorage.setItem(
    projectTitleStorage,
    JSON.stringify({
      projectTitles: [],
    }),
  );
}

function initializeStorage() {
  let isInit = localStorage.getItem(initState);

  if (isInit === null) {
    setInitState(true);
    initializeProjTracker();
  }
}

function isStorageInit() {
  return JSON.parse(localStorage.getItem(initState));
}

function checkDuplicateProject(project) {
  let projects = grabProjects();

  if (typeof project === "string") {
    if (!projects[projectTitleArr].includes(project)) {
      return false;
    }
    return true;
  }

  if (!projects[projectTitleArr].includes(project.title)) {
    return false;
  }
  return true;
}

function storeProject(project) {
  localStorage.setItem(project.title, parseTasksForStorage(project.tasks));

  let projects = grabProjects();

  if (!projects[projectTitleArr].includes(project.title)) {
    projects[projectTitleArr].push(project.title);
    localStorage.setItem(projectTitleStorage, JSON.stringify(projects));
  }
}

function getLatestProject() {
  let projects = grabProjects();
  let latestProj =
    projects[projectTitleArr][projects[projectTitleArr].length - 1];
  return grabProject(latestProj);
}

function deleteProject(project) {
  let projectTitle = project.title;
  let projects = grabProjects();
  let projDeleted = projects[projectTitleArr].filter(
    (proj) => !(proj === projectTitle),
  );
  projects[projectTitleArr] = projDeleted;

  localStorage.setItem(projectTitleStorage, JSON.stringify(projects));
  localStorage.removeItem(projectTitle);
}

function checkForProjects() {
  let projects = grabProjects();
  return projects[projectTitleArr].length > 0;
}

// returns array of project titles
function grabProjectTitles() {
  return grabProjects()[projectTitleArr];
}

function grabProjects() {
  return JSON.parse(localStorage.getItem(projectTitleStorage));
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

function changeProjTitle(currTitle, newTitle) {
  let currProjectTasks = localStorage.getItem(currTitle);
  let projects = grabProjects();

  localStorage.removeItem(currTitle);
  localStorage.setItem(newTitle, currProjectTasks);

  projects[projectTitleArr] = projects[projectTitleArr].map((e) => {
    if (e === currTitle) {
      return newTitle;
    } else {
      return e;
    }
  });

  localStorage.setItem(projectTitleStorage, JSON.stringify(projects));
}

export {
  initializeStorage,
  isStorageInit,
  storeProject,
  deleteProject,
  grabProjectTitles,
  getLatestProject,
  grabProject,
  checkForProjects,
  initializeProjTracker,
  checkDuplicateProject,
  changeProjTitle,
};
