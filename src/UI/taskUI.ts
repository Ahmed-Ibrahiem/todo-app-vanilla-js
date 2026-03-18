// =======================================================================
import {
  addTaskBtn,
  completedTasksContainer,
  notCompletedTasksContainer,
  taskCategoryOptions,
  taskTitleInput,
} from "../index.js";
import {
  completedTasksArr,
  deleteTasks,
  disabledTask,
  handleAddTaskClicked,
  handleCompletedTasks,
  notCompletedTasksarr,
  toggleDisabledTasks,
  updateTask,
} from "../services/taskServices.js";

export let taskCategory: string = "BUSINESS";

// Render notCompleted Tasks Container
export const renderNotCompletedTasks = (): void => {
  // Clear All Element
  notCompletedTasksContainer.innerHTML = ``;

  // if notCompletedTasksarr is empty then show the empty tasks message
  if (notCompletedTasksarr.length == 0) {
    notCompletedTasksContainer.innerHTML = `<div class="empty_tasks_message">-------- No Tasks Yet --------</div>`;
  } else {
    // Create li elements depend on the notCompletedTasksarr of data
    notCompletedTasksarr.forEach((data, index) => {
      notCompletedTasksContainer.innerHTML += `  <li class="not_completed_list task_element" data-id="${data.id}">
        <div class="left">
            <input type="checkbox" class="disabled_btn" id="task${index}">
            <label for="task${index}">${data.title}</label>
            <input type="text" class="update_input" value="${data.title}" />
        </div>
        <div class="right">
            <button class="completed" type="button" data-id="${data.id}">Complete</button>
            <button class="update" type="button" data-mode="updating" data-id="${data.id}">Update</button>
            <button class="delete" type="button" data-id="${data.id}">Delete</button>
        </div>
    </li>`;
    });
  }
};

// Render notCompleted Tasks Container
export const renderCompletedTasks = (): void => {
  // Clear All Element
  completedTasksContainer.innerHTML = ``;

  // if notCompletedTasksarr is empty then show the empty tasks message
  if (completedTasksArr.length == 0) {
    completedTasksContainer.innerHTML = `<div class="empty_tasks_message ">-------- No Tasks Yet --------</div>`;
  } else {
    // Create li elements depend on the notCompletedTasksarr of data
    completedTasksArr.forEach((data) => {
      completedTasksContainer.innerHTML += `  <li class="completed_list task_element" data-id="${data.id}">
        <div class="left">
            <input type="checkbox" class="disabled_btn" class="" id="task">
            <label for="task">${data.title}</label>
        </div>
        <div class="right">
            <button class="delete" type="button" data-id="${data.id}">Delete</button>
        </div>
    </li>`;
    });
  }
};

// Render the tasks elements for first time
renderNotCompletedTasks();
renderCompletedTasks();

addTaskBtn.addEventListener("click", (e): void => handleAddTaskClicked(e));

// Add event listner to all buttons in task element
notCompletedTasksContainer.addEventListener("click", (e): void => {
  const btn = e.target as HTMLButtonElement;
  const disabledBtn = e.target as HTMLInputElement;

  const taskElement = btn.closest("li");
  if (!taskElement) return;

  if (btn.classList.contains("completed"))
    handleCompletedTasks(taskElement.dataset.id!);

  if (btn.classList.contains("update")) {
    if (btn.dataset.mode === "updating") updateTask(taskElement);
  }

  if (btn.classList.contains("delete")) deleteTasks(taskElement);

  if (disabledBtn.classList.contains("disabled_btn")) {
    // [6.1] if task id is includes in disabledTasksArr then: remove from it.
    //       else: Push in it.
    toggleDisabledTasks(taskElement.dataset.id!);
    disabledTask();
  }
});

completedTasksContainer.addEventListener("click", (e): void => {
  const btn = e.target as HTMLButtonElement;
  const taskElement = btn.closest("li");
  const disabledBtn = e.target as HTMLInputElement;

  if (!taskElement) return;

  if (btn.classList.contains("delete")) deleteTasks(taskElement);

  if (disabledBtn.classList.contains("disabled_btn")) {
    // [6.1] if task id is includes in disabledTasksArr then: remove from it.
    //       else: Push in it.
    toggleDisabledTasks(taskElement.dataset.id!);
    disabledTask();
  }
});

// [1] CategoryActive State Toggle when user clicked on any of category options
taskCategoryOptions.forEach((element) => {
  element.addEventListener("click", () => {
    taskCategoryOptions.forEach((ele) =>
      ele.classList.remove("category_active"),
    );
    element.classList.add("category_active");
    taskCategory = element.dataset.category!;
  });
});

// When user input the data in task's title input make it valid
taskTitleInput.oninput = (e): void => {
  const input = e.target as HTMLInputElement;
  // remove the invalid UI from title input
  taskTitleInput.classList.remove("not_valid");

  // if the title input is emtpy remove the active class from the add_btn
  if (input.value.trim() == "") {
    addTaskBtn.classList.remove("active");
  }
  // if the title input is not empty remove the active class from the add_btn
  else {
    addTaskBtn.classList.add("active");
  }
};
