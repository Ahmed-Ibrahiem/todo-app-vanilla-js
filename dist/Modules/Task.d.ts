interface completedTasksType {
    id: string;
    title: string;
}
interface notCompletedTasksType extends completedTasksType {
    completed: boolean;
    category: string;
}
export type { completedTasksType, notCompletedTasksType };
export declare class Tasks {
    id: string;
    title: string;
    completed: boolean;
    category: string;
    constructor(id: string, title: string, completed: boolean, category: string);
}
//# sourceMappingURL=Task.d.ts.map