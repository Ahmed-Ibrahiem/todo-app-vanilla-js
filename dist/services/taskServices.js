import { addTaskBtn, taskTitleInput } from "../index.js";
import { Tasks, } from "../Modules/Task.js";
import { updateLocalStorage } from "../storage/localStorage.js";
import { renderCompletedTasks, renderNotCompletedTasks, taskCategory, } from "../UI/taskUI.js";
export let completedTasksArr = JSON.parse(localStorage.getItem("completedTasks") || "[]");
export let notCompletedTasksarr = JSON.parse(localStorage.getItem("notCompletedTasks") || "[]");
export let disabledTasksArr = JSON.parse(localStorage.getItem("disabledTasks") || "[]");
// =======================================================================
// [2] When user click on "add_task" btn.
export const handleAddTaskClicked = (e) => {
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
        const newTask = new Tasks(crypto.randomUUID(), taskTitleInput.value, false, taskCategory);
        // [2.4] Add the task (id , title , completed "ture or false") to not completed tasks array.
        notCompletedTasksarr.push(newTask);
        // [2.5] Rerender the not completed tasks container ul element.
        renderNotCompletedTasks();
        // [2.6] Make Task's title input to default value
        taskTitleInput.value = "";
        // [2.7] Save it localstorage.
        updateLocalStorage();
        // [2.8] Return the UI elements to default statues
        taskTitleInput.classList.remove("not_valid");
        addTaskBtn.classList.remove("active");
    }
};
// =======================================================================
// [3] When user click on "complete" btn in not completed task element.
export const handleCompletedTasks = (id) => {
    // [3.1] Get task by tasks id.
    const task = notCompletedTasksarr.find((ts) => ts.id == id);
    // [3.2] Add the taks to completed tasks array.
    if (task)
        completedTasksArr.push(task);
    else
        return;
    // [3.3] Remove the completed task from not completed tasks arr
    const notCompletedList = notCompletedTasksarr.filter((data) => data.id !== id);
    notCompletedTasksarr = notCompletedList;
    // [3.4] Update the localstorage to each (completed & not completed) arr
    updateLocalStorage();
    // [3.5] Rerender for each of completed and not completed array.
    renderNotCompletedTasks();
    renderCompletedTasks();
};
// =======================================================================
// [4] When user click on "update" btn in not completed task element.
export const updateTask = (taskElement) => {
    // [4.1] Get the element that user want update his title.
    if (!taskElement)
        return;
    const id = taskElement.dataset.id;
    if (!id)
        return;
    // [4.2] Hide task label element and show task input element.
    // Add the updating class to li element to show the title input and hide the title label
    taskElement.classList.add("updating");
    // Get the title input to let user update the task's title
    const taskUpdateInput = taskElement.querySelector(".update_input");
    // Focus on the title input to make the user relize he can edit the task
    taskUpdateInput.focus();
    taskUpdateInput.select();
    // Change update btn's text to "finish" text and his mode to "finish mode"
    const updateBtn = taskElement.querySelector(".update");
    updateBtn.textContent = "Finish";
    updateBtn.dataset.mode = "finish_update";
    // [4.3] Replace the new task with the old task by using id.
    // Create Function that handle finish updating operation
    const changeTask = () => {
        const oldTask = notCompletedTasksarr.find((task) => task.id === id);
        if (!oldTask)
            return;
        const newTask = {
            ...oldTask,
            title: taskUpdateInput.value,
        };
        const notCompletedList = notCompletedTasksarr.map((task) => task.id === id ? newTask : task);
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
        const btn = e.currentTarget;
        if (btn.dataset.mode == "finish_update") {
            changeTask();
        }
    });
};
// =======================================================================
// [5] When user click on "Delete" btn in not completed task element.
export const deleteTasks = (taskElement) => {
    // [5.1] Get the taskElement.
    if (taskElement.classList.contains("completed_list")) {
        // [5.2] Delete the task from task array by using taks's id.
        const newTasks = completedTasksArr.filter((task) => task.id !== taskElement.dataset.id);
        completedTasksArr = newTasks;
    }
    else if (taskElement.classList.contains("not_completed_list")) {
        const newTasks = notCompletedTasksarr.filter((task) => task.id !== taskElement.dataset.id);
        notCompletedTasksarr = newTasks;
    }
    // [5.3] Rerender the not completed tasks elements
    renderCompletedTasks();
    renderNotCompletedTasks();
    updateLocalStorage();
};
// =======================================================================
// [6] When user click "desabled" btn in task element
export const toggleDisabledTasks = (id) => {
    // [6.1] if task id is includes in disabledTasksArr then: remove from it.
    //       else: Push in it.
    if (disabledTasksArr.includes(id)) {
        let newTasks = [];
        newTasks = [...disabledTasksArr.filter((task) => task !== id)];
        disabledTasksArr = newTasks;
    }
    else {
        disabledTasksArr.push(id);
    }
    // [6.2] Update localstorage.
    updateLocalStorage();
};
export const disabledTask = () => {
    // [6.3] Get all taskElement.
    const allTasksElement = document.querySelectorAll("li.task_element");
    allTasksElement.forEach((ele) => {
        // [6.4] Loop on these elements and if it's dataset.id is includes in disabledTasksArr then:
        const disabledBtn = ele.querySelector(".disabled_btn");
        if (disabledTasksArr.includes(ele.dataset.id)) {
            // * Make his disabled btn is checked.
            ele.classList.add("disabled");
            // * Add class "disabled" to this element.
            disabledBtn.checked = true;
        }
        else {
            // * Remove class "disabled" to this element.
            ele.classList.remove("disabled");
            // * Make his disabled btn is unChecked.
            disabledBtn.checked = false;
        }
    });
};
disabledTask();
//# sourceMappingURL=taskServices.js.map