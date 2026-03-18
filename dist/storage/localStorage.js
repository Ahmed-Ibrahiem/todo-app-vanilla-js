import { completedTasksArr, disabledTasksArr, notCompletedTasksarr } from "../services/taskServices.js";
// update localStroage "to make it reusable"
export const updateLocalStorage = () => {
    localStorage.setItem("notCompletedTasks", JSON.stringify(notCompletedTasksarr));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasksArr));
    localStorage.setItem("disabledTasks", JSON.stringify(disabledTasksArr));
};
//# sourceMappingURL=localStorage.js.map