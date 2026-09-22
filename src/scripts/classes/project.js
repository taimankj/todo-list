import { Task } from "./task.js";

export class Project {
  constructor(title) {
    this._tasks = [];
    this._title = title;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  addTask(task) {
    this._tasks.push(task);
  }

  removeTask(taskID) {
    this.tasks = this.tasks.filter((task) => !(task.taskID === taskID));
  }

  editTask(taskID, title, date, priority, description) {
    this.tasks = this.tasks.map((task) => {
      if (taskID === task.taskID) {
        const editedTask = new Task(title, date, priority, description);
        editedTask.taskID = taskID;
        return editedTask;
      }
      return task;
    });
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }
}
