import { ConfigProvider, notification } from "antd";
import { theme } from "antd";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { NewTaskForm, Task } from "./components";
import { useAppDispatch, useAppSelector, useDarkmode } from "./hooks";
import { tasksActions } from "./store/tasks/slice";

const App = () => {
  const [notificationApi, notificationContext] = notification.useNotification();
  const { isDarkMode } = useDarkmode();

  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleFormSubmission = (task: string) => {
    const id = uuid();
    const newTask = { id, task, isDone: false };

    dispatch(tasksActions.addNewTask(newTask));

    notificationApi.success({
      message: "New task created",
      placement: "bottomRight",
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(tasksActions.setTasks(items));
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {notificationContext}

      <div className="mx-auto mt-6 flex w-96 flex-col justify-center">
        <NewTaskForm onSubmit={handleFormSubmission} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskWrapper">
            {(provided) => (
              <ul
                className="mt-4 flex flex-col gap-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((taskData, index) => (
                  <Draggable
                    key={taskData.id}
                    draggableId={taskData.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task data={taskData} onClick={() => "lol"} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ConfigProvider>
  );
};

export default App;
