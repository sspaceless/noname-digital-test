export type Task = {
  id: string;
  task: string;
};

export type State = {
  todo: Task[];
  done: Task[];
};
