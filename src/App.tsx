import { ConfigProvider } from "antd";
import { theme } from "antd";
import { v4 as uuid } from "uuid";

import { NewTaskForm, Task } from "./components";
import { useAppDispatch, useAppSelector, useDarkmode } from "./hooks";
import { tasksActions } from "./store/tasks/slice";

const App = () => {
  const { isDarkMode } = useDarkmode();
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const handleFormSubmission = (task: string) => {
    const id = uuid();
    const newTask = { id, task, isDone: false };
    dispatch(tasksActions.addNewTask(newTask));
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className="mx-auto mt-6 flex w-96 flex-col justify-center">
        <NewTaskForm onSubmit={handleFormSubmission} />
        <div>
          {tasks.map((taskData) => (
            <Task key={taskData.id} />
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
