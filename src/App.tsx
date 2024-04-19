import { ConfigProvider, Divider, notification } from "antd";
import { theme } from "antd";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { DragAndDropList, NewTaskForm, Task } from "./components";
import { useAppDispatch, useAppSelector, useDarkmode } from "./hooks";
import { tasksActions } from "./store/tasks/slice";

const App = () => {
  const [notificationApi, notificationContext] = notification.useNotification();
  const { isDarkMode } = useDarkmode();

  const { todo, done } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleFormSubmission = (task: string) => {
    const id = uuid();
    const newTask = { id, task, isDone: false };

    dispatch(tasksActions.pushTodo(newTask));

    notificationApi.success({
      message: "New task created",
      placement: "bottomRight",
    });
  };

  const handleTodoListDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(todo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(tasksActions.setTodo(items));
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  const todoList = todo.map((taskData, index) => {
    const handleDoneButtonClick = () => {
      const todoItems = Array.from(todo);
      const [removedItem] = todoItems.splice(index, 1);
      dispatch(tasksActions.setTodo(todoItems));
      dispatch(tasksActions.pushDone(removedItem));
    };

    return (
      <Task
        key={taskData.id}
        data={taskData}
        index={index}
        onClick={handleDoneButtonClick}
      />
    );
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {notificationContext}

      <div className="mx-auto mt-6 flex w-96 flex-col justify-center">
        <NewTaskForm onSubmit={handleFormSubmission} />

        <DragAndDropList
          droppableId="todoWrapper"
          onDragEnd={handleTodoListDragEnd}
        >
          {todoList}
        </DragAndDropList>

        <Divider />

        <DragAndDropList
          droppableId="doneWrapper"
          onDragEnd={handleTodoListDragEnd}
        >
          {done.map((taskData, index) => (
            <Task
              key={taskData.id}
              data={taskData}
              index={index}
              onClick={() => "lol"}
            />
          ))}
        </DragAndDropList>
      </div>
    </ConfigProvider>
  );
};

export default App;
