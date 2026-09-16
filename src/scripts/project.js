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

  removeTask(task) {
    this.tasks = this.tasks.filter(
      (ele) =>
        !(
          ele.title === task.title &&
          ele.date === task.date &&
          ele.priority === task.priority &&
          ele.description === task.description
        ),
    );
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }
}
