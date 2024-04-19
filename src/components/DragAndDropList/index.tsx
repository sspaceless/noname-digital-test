import { FC } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { DragAndDropListProps } from "./types";

export const DragAndDropList: FC<DragAndDropListProps> = ({
  droppableId,
  children,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul
            className="mt-4 flex flex-col gap-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
