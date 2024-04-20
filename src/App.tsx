import { Collapse, notification } from "antd";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { DragAndDropList, NewTaskForm, Task } from "./components";
import { useAppDispatch, useAppSelector } from "./hooks";
import { tasksActions } from "./store/tasks/slice";

const App = () => {
  const [notificationApi, notificationContext] = notification.useNotification();
  const { todo, done } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const handleFormSubmission = (task: string) => {
    const taskId = uuid();
    const newTask = { id: taskId, task };

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

  const handleDoneListDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(done);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(tasksActions.setDone(items));
  };

  const todoList = todo.map((taskData, index) => {
    const handleDoneButtonClick = () => {
      const todoItems = Array.from(todo);
      const [removedItem] = todoItems.splice(index, 1);
      dispatch(tasksActions.setTodo(todoItems));
      dispatch(tasksActions.pushDone(removedItem));

      notificationApi.success({
        message: "Task moved to Done",
        placement: "bottomRight",
      });
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

  const doneList = done.map((taskData, index) => {
    const handleButtonClick = () => {
      const doneItems = Array.from(done);
      doneItems.splice(index, 1);
      dispatch(tasksActions.setDone(doneItems));

      notificationApi.success({
        message: "Task deleted",
        placement: "bottomRight",
      });
    };

    return (
      <Task
        key={taskData.id}
        data={taskData}
        index={index}
        done
        onClick={handleButtonClick}
      />
    );
  });

  const collapseItem = {
    key: "1",
    label: `Your done tasks (${done.length})`,
    children: (
      <div className="mt-2">
        <DragAndDropList
          droppableId="doneWrapper"
          onDragEnd={handleDoneListDragEnd}
        >
          {doneList}
        </DragAndDropList>
      </div>
    ),
  };

  const hasDoneTasks = done.length > 0;

  return (
    <>
      {notificationContext}

      <div className="mx-auto mt-6 flex w-11/12 flex-col justify-center gap-4 sm:w-96">
        <span className="text-center text-xl"> todo :)</span>
        <NewTaskForm onSubmit={handleFormSubmission} />
        <DragAndDropList
          droppableId="todoWrapper"
          onDragEnd={handleTodoListDragEnd}
        >
          {todoList}
        </DragAndDropList>
        {hasDoneTasks && <Collapse ghost items={[collapseItem]} />}
      </div>
    </>
  );
};

export default App;
