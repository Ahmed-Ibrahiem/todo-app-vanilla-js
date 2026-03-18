import { type completedTasksType, type notCompletedTasksType } from "../Modules/Task.js";
export declare let completedTasksArr: completedTasksType[];
export declare let notCompletedTasksarr: notCompletedTasksType[];
export declare let disabledTasksArr: string[];
export declare const handleAddTaskClicked: (e: PointerEvent) => void;
export declare const handleCompletedTasks: (id: string) => void;
export declare const updateTask: (taskElement: HTMLElement) => void;
export declare const deleteTasks: (taskElement: HTMLLIElement) => void;
export declare const toggleDisabledTasks: (id: string) => void;
export declare const disabledTask: () => void;
//# sourceMappingURL=taskServices.d.ts.map