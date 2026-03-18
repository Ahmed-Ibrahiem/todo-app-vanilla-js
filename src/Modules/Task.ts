interface completedTasksType {
  id: string;
  title: string;
}

interface notCompletedTasksType extends completedTasksType {
  completed: boolean;
  category: string;
}

export type { completedTasksType, notCompletedTasksType };

export class Tasks {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean,
    public category: string,
  ) {}
}

