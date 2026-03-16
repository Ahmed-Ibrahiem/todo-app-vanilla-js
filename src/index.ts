const taskTitleInput = document.getElementById(
  "task_title",
) as HTMLInputElement;
const taskCategoryOptions = document.querySelectorAll<HTMLDivElement>(
  ".category_options > div",
);
const addTaskBtn = document.getElementById("add_todo") as HTMLButtonElement;
const notCompletedTasksContainer = document.getElementById(
  "not_completed_tasks_container",
) as HTMLUListElement;
const completedTasksContainer = document.getElementById(
  "completed_tasks_container",
) as HTMLUListElement;
let taskCategory: string = "BUSINESS";

interface completedTasksType {
  id: string;
  title: string;
}

interface notCompletedTasksType extends completedTasksType {
  completed: boolean;
  category: string;
}

class Tasks {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean,
    public category: string,
  ) {}
}

let completedTasksArr: completedTasksType[] = JSON.parse(
  localStorage.getItem("completedTasks") || "[]",
) as completedTasksType[];

let notCompletedTasksarr: notCompletedTasksType[] = JSON.parse(
  localStorage.getItem("notCompletedTasks") || "[]",
) as notCompletedTasksType[];

let disabledTasksArr: string[] = JSON.parse(
  localStorage.getItem("disabledTasks") || "[]",
);

// update localStroage "to make it reusable"
const updateLocalStorage = (): void => {
  localStorage.setItem(
    "notCompletedTasks",
    JSON.stringify(notCompletedTasksarr),
  );
  localStorage.setItem("completedTasks", JSON.stringify(completedTasksArr));
  localStorage.setItem("disabledTasks", JSON.stringify(disabledTasksArr));
};

// =======================================================================
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

// Render notCompleted Tasks Container
const renderNotCompletedTasks = (): void => {
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

// Render notCompleted Tasks Container
const renderCompletedTasks = (): void => {
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

// =======================================================================
// [2] When user click on "add_task" btn.
const handleAddTaskClicked = (e: PointerEvent): void => {
  // [2.1] PreventDefault Behavior
  e.preventDefault();
  // [2.2] Get the task title form task input
  const taksTitle = taskTitleInput.value;

  // If user not input the task text:
  if (taksTitle.trim() === "") {
    // [2.3] Show UI notifi.
    taskTitleInput.classList.add("not_valid");
    // [2.2] And focus the task text input element.
    taskTitleInput.focus();
  }
  // If user input the task text:
  else {
    // [2.3] Get the task text and it's category.
    const newTask = new Tasks(
      crypto.randomUUID(),
      taskTitleInput.value,
      false,
      taskCategory,
    );
    // [2.4] Add the task (id , title , completed "ture or false") to not completed tasks array.
    notCompletedTasksarr.push(newTask);
    // [2.5] Rerender the not completed tasks container ul element.
    renderNotCompletedTasks();
    // [2.6] Make Task's title input to default value
    taskTitleInput.value = "";
    // [2.7] Save it localstorage.
    updateLocalStorage();
  }
};

addTaskBtn.addEventListener("click", (e): void => handleAddTaskClicked(e));

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

// =======================================================================
// [3] When user click on "complete" btn in not completed task element.
const handleCompletedTasks = (id: string): void => {
  // [3.1] Get task by tasks id.
  const task = notCompletedTasksarr.find((ts) => ts.id == id);
  // [3.2] Add the taks to completed tasks array.
  if (task) completedTasksArr.push(task);
  else return;
  // [3.3] Remove the completed task from not completed tasks arr
  const notCompletedList = notCompletedTasksarr.filter(
    (data) => data.id !== id,
  );
  notCompletedTasksarr = notCompletedList;
  // [3.4] Update the localstorage to each (completed & not completed) arr
  updateLocalStorage();
  // [3.5] Rerender for each of completed and not completed array.
  renderNotCompletedTasks();
  renderCompletedTasks();
};

// =======================================================================
// [4] When user click on "update" btn in not completed task element.
const updateTask = (taskElement: HTMLElement): void => {
  // [4.1] Get the element that user want update his title.
  if (!taskElement) return;

  const id: string = taskElement.dataset.id!;
  if (!id) return;

  // [4.2] Hide task label element and show task input element.
  // Add the updating class to li element to show the title input and hide the title label
  taskElement.classList.add("updating");

  // Get the title input to let user update the task's title
  const taskUpdateInput: HTMLInputElement =
    taskElement.querySelector(".update_input")!;

  // Focus on the title input to make the user relize he can edit the task
  taskUpdateInput.focus();
  taskUpdateInput.select();

  // Change update btn's text to "finish" text and his mode to "finish mode"
  const updateBtn: HTMLButtonElement = taskElement.querySelector(".update")!;
  updateBtn.textContent = "Finish";
  updateBtn.dataset.mode = "finish_update";

  // [4.3] Replace the new task with the old task by using id.
  // Create Function that handle finish updating operation
  const changeTask = () => {
    const oldTask = notCompletedTasksarr.find((task) => task.id === id);
    if (!oldTask) return;
    const newTask: notCompletedTasksType = {
      ...oldTask,
      title: taskUpdateInput.value,
    };
    const notCompletedList = notCompletedTasksarr.map((task) =>
      task.id === id ? newTask : task,
    );

    // [4.4] Render for each of complete and not completed array.
    notCompletedTasksarr = notCompletedList;
    updateLocalStorage();

    updateBtn.textContent = "Update";
    updateBtn.dataset.mode = "updating";

    renderNotCompletedTasks();

    taskUpdateInput.removeEventListener("blur", changeTask);
    updateBtn.removeEventListener("click", changeTask);
  };

  taskUpdateInput.addEventListener("blur", changeTask);

  updateBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement;

    if (btn.dataset.mode == "finish_update") {
      changeTask();
    }
  });
};

// =======================================================================
// [5] When user click on "Delete" btn in not completed task element.
const deleteTasks = (taskElement: HTMLLIElement): void => {
  // [5.1] Get the taskElement.
  if (taskElement.classList.contains("completed_list")) {
    // [5.2] Delete the task from task array by using taks's id.
    const newTasks = completedTasksArr.filter(
      (task) => task.id !== taskElement.dataset.id,
    );
    completedTasksArr = newTasks;
  } else if (taskElement.classList.contains("not_completed_list")) {
    const newTasks = notCompletedTasksarr.filter(
      (task) => task.id !== taskElement.dataset.id,
    );
    notCompletedTasksarr = newTasks;
  }
  // [5.3] Rerender the not completed tasks elements
  renderCompletedTasks();
  renderNotCompletedTasks();
  updateLocalStorage();
};

// =======================================================================
// [6] When user click "desabled" btn in task element
const toggleDisabledTasks = (id: string) => {
  // [6.1] if task id is includes in disabledTasksArr then: remove from it.
  //       else: Push in it.
  if (disabledTasksArr.includes(id)) {
    let newTasks = [];
    newTasks = [...disabledTasksArr.filter((task) => task !== id)];
    disabledTasksArr = newTasks;
  } else {
    disabledTasksArr.push(id);
  }
  // [6.2] Update localstorage.
  updateLocalStorage();
};

const disabledTask = (): void => {
  // [6.3] Get all taskElement.
  const allTasksElement =
    document.querySelectorAll<HTMLLIElement>("li.task_element");

  allTasksElement.forEach((ele) => {
    // [6.4] Loop on these elements and if it's dataset.id is includes in disabledTasksArr then:
    const disabledBtn = ele.querySelector(".disabled_btn") as HTMLInputElement;
    if (disabledTasksArr.includes(ele.dataset.id!)) {
      // * Make his disabled btn is checked.
      ele.classList.add("disabled");
      // * Add class "disabled" to this element.
      disabledBtn.checked = true;
    } else {
      // * Remove class "disabled" to this element.
      ele.classList.remove("disabled");
      // * Make his disabled btn is unChecked.
      disabledBtn.checked = false;
    }
  });
};

disabledTask();
