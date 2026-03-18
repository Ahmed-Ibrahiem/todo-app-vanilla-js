export const taskTitleInput = document.getElementById(
  "task_title",
) as HTMLInputElement;
export const taskCategoryOptions = document.querySelectorAll<HTMLDivElement>(
  ".category_options > div",
);
export const addTaskBtn = document.getElementById(
  "add_todo",
) as HTMLButtonElement;
export const notCompletedTasksContainer = document.getElementById(
  "not_completed_tasks_container",
) as HTMLUListElement;
export const completedTasksContainer = document.getElementById(
  "completed_tasks_container",
) as HTMLUListElement;
