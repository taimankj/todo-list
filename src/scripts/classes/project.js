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

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }
}
