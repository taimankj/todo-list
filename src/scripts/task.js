export class Task {
  constructor(title, date, priority, description) {
    this._title = title;
    this._date = date;
    this._priority = priority; // 1 - low, 2 - med, 3 - high
    this._description = description;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }
}
