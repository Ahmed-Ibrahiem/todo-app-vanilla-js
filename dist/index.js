const taskTitleInput = document.getElementById("task_title");
const taskCategoryOptions = document.querySelectorAll('.category_options > div');
const addTaskBtn = document.getElementById("add_todo");
const notCompletedTasksContainer = document.getElementById('not_completed_tasks_container');
const completedTasksContainer = document.getElementById('completed_tasks_container');
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
`;
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
`;
// CategoryActive State Toggle
taskCategoryOptions.forEach((element) => {
    element.addEventListener('click', () => {
        taskCategoryOptions.forEach(ele => ele.classList.remove('category_active'));
        element.classList.add('category_active');
    });
});
export {};
//# sourceMappingURL=index.js.map