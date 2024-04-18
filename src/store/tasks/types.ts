export type Task = {
  id: string;
  task: string;
  isDone: boolean;
};

export type State = {
  tasks: Task[];
};
