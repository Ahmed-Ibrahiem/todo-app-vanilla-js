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

// update localStroage "to make it reusable"
const updateLocalStorage = () => {
  localStorage.setItem(
    "notCompletedTasks",
    JSON.stringify(notCompletedTasksarr),
  );
  localStorage.setItem("completedTasks", JSON.stringify(completedTasksArr));
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
const renderNotCompletedTasks = () => {
  // Clear All Element
  notCompletedTasksContainer.innerHTML = ``;

  // if notCompletedTasksarr is empty then show the empty tasks message
  if (notCompletedTasksarr.length == 0) {
    notCompletedTasksContainer.innerHTML = `<div class="empty_tasks_message">-------- No Tasks Yet --------</div>`;
  } else {
    // Create li elements depend on the notCompletedTasksarr of data
    notCompletedTasksarr.forEach((data, index) => {
      notCompletedTasksContainer.innerHTML += `  <li  data-id="${data.id}">
        <div class="left">
            <input type="checkbox" id="task${index}">
            <label for="task${index}">${data.title}</label>
            <input type="text" id="update_input" value="${data.title}" />
        </div>
        <div class="right">
            <button class="completed" data-id="${data.id}">Complete</button>
            <button class="update" data-mode="updating" data-id="${data.id}">Update</button>
            <button class="delete" data-id="${data.id}">Delete</button>
        </div>
    </li>`;
    });

    // add event listner to tasks
    const getAllCompletedBtns = document.querySelectorAll<HTMLButtonElement>(
      "#not_completed_tasks_container .completed",
    );

    const getAllUpdateBtns = document.querySelectorAll<HTMLButtonElement>(
      "#not_completed_tasks_container .update",
    );

    getAllCompletedBtns.forEach((btn: HTMLButtonElement) => {
      btn.addEventListener("click", () =>
        handleCompletedTasks(btn.dataset.id!),
      );
    });

    getAllUpdateBtns.forEach((btn: HTMLButtonElement) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.mode == "updating") updateTask(btn.dataset.id!);
      });
    });
  }
};

// Render notCompleted Tasks Container
const renderCompletedTasks = () => {
  // Clear All Element
  completedTasksContainer.innerHTML = ``;

  // if notCompletedTasksarr is empty then show the empty tasks message
  if (completedTasksArr.length == 0) {
    completedTasksContainer.innerHTML = `<div class="empty_tasks_message">-------- No Tasks Yet --------</div>`;
  } else {
    // Create li elements depend on the notCompletedTasksarr of data
    completedTasksArr.forEach((data) => {
      completedTasksContainer.innerHTML += `  <li data-id="${data.id}">
        <div class="left">
            <input type="checkbox" id="task">
            <label for="task">${data.title}</label>
            <input type="text" id="update_input" value="${data.title}" />
        </div>
        <div class="right">
            <button id="delete" data-id="${data.id}">Delete</button>
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
    const TASK: notCompletedTasksType = {
      id: crypto.randomUUID(),
      title: taskTitleInput.value,
      completed: false,
      category: taskCategory,
    };
    const newTask = new Tasks(
      TASK.id,
      TASK.title,
      TASK.completed,
      TASK.category,
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

addTaskBtn.addEventListener("click", (e) => handleAddTaskClicked(e));

// When user input the data in task's title input make it valid
taskTitleInput.oninput = (e) => {
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
const handleCompletedTasks = (id: string) => {
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
const updateTask = (id: string) => {
  // [4.1] Get the element that user want update his title.
  const taskElement =
    Array.from(
      document.querySelectorAll<HTMLLIElement>(
        "#not_completed_tasks_container li",
      ),
    ).find((ele) => ele.dataset.id == id) || undefined;

  if (taskElement == undefined) return;

  // [4.1] Hide task label element and show task input element.
  // Add the updating class to li element to show the title input and hide the title label
  taskElement.classList.add("updating");

  // Get the title input to let user update the task's title
  const taskUpdateInput: HTMLInputElement =
    taskElement.querySelector("#update_input")!;

  // Focus on the title input to make the user relize he can edit the task
  taskUpdateInput.focus();
  taskUpdateInput.select();

  // Change update btn's text to "finish" text and his mode to "finish mode"
  const updateBtn: HTMLButtonElement = taskElement.querySelector(".update")!;
  updateBtn.textContent = "Finish";
  updateBtn.dataset.mode = "finish_update";

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
    notCompletedTasksarr = notCompletedList;
    updateLocalStorage();
    updateBtn.textContent = "Update";
    updateBtn.dataset.mode = "updating";
    renderNotCompletedTasks();
  };

  taskUpdateInput.addEventListener("blur", changeTask);

  updateBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement;

    if (btn.dataset.mode == "finish_update") {
      changeTask();
    }
  });
};
