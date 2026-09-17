/*
Projects with tasks stored in the following format
{
  "projectOne": {
    "taskOne": ["date", "priority", "description"],
    "taskN": ["date", "priority", "description"]
  },
  "projectN": {
    "taskOne": ["date", "priority", "description"]
  }
}
*/

function parseTasksForStorage(projTasks) {
  let tasksObj = {};

  projTasks.forEach((task) => {
    tasksObj[task.title] = [task.date, task.priority, task.description];
  });

  return JSON.stringify(tasksObj);
}

function convertToObject(project) {
  return JSON.parse(project);
}

export { parseTasksForStorage, convertToObject };
