const taskTitleInput = document.getElementById("task_title") as HTMLInputElement;
const taskCategoryOptions = document.querySelectorAll('.category_options > div');
const addTaskBtn = document.getElementById("add_todo") as HTMLButtonElement;
const notCompletedTasksContainer = document.getElementById('not_completed_tasks_container') as HTMLUListElement;
const completedTasksContainer = document.getElementById('completed_tasks_container') as HTMLUListElement;

const notCompletedtask = `
  <li>
    <div class="left">
        <input type="checkbox" id="task">
        <label for="task">Go to work</label>
        <input type="text" id="update_input" value="Go to work" />
    </div>
    <div class="right">
        <button id="update">update</button>
        <button id="delete">delete</button>
    </div>
</li>
`
const Completedtask = `
  <li>
    <div class="left">
        <input type="checkbox" id="task">
        <label for="task">Go to work</label>
        <input type="text" id="update_input" value="Go to work" />
    </div>
    <div class="right">
        <button id="delete">delete</button>
    </div>
</li>
`