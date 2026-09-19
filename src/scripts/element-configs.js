function configureTask(
  task,
  taskContainer,
  taskInfo,
  taskTitle,
  taskDate,
  taskPriority,
  taskDescription,
) {
  taskContainer.className = "task-container";
  taskInfo.className = "task-info";
  taskTitle.className = "task-title";
  taskDate.className = "task-date";
  taskPriority.classList.add("task-priority", `priority-${task.priority}`);
  taskDescription.className = "task-description";

  taskTitle.innerText = task.title;
  taskDate.innerText = task.date;
  taskPriority.innerText = ".";
  taskDescription.innerText = task.description;
}

function configureProjInput(projBox) {
  projBox.setAttribute("type", "text");
  projBox.setAttribute("minlength", "1");
  projBox.setAttribute("maxlength", "10");
  projBox.required = true;
  projBox.id = "new-project";
}

function configureProjDeleteButton(delBtn) {
  delBtn.id = "delete-proj-btn";
  delBtn.setAttribute("command", "show-modal");
  delBtn.setAttribute("commandfor", "del-proj-dialog");
}

export { configureTask, configureProjInput, configureProjDeleteButton };
