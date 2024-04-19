import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import { TaskProps } from "./types";

export const Task: FC<TaskProps> = ({ data, index, done = false, onClick }) => {
  const buttonIcon = done ? <DeleteOutlined /> : <CheckOutlined />;

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card size="small" styles={{ body: { padding: "0.25rem 0.5rem" } }}>
            <div className="mx-1 flex w-full select-none flex-row items-center justify-between">
              <span className={done ? "line-through" : ""}>{data.task}</span>
              <Button type="text" icon={buttonIcon} onClick={onClick} />
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  );
};
