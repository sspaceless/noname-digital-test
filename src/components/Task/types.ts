import { Task } from "../../store/tasks/types";

export type TaskProps = {
  data: Task;
  onClick: () => void;
};
