import { Task } from "../../store/tasks/types";

export type TaskProps = {
  data: Task;
  index: number;
  done?: boolean;
  onClick: () => void;
};
