import { ReactNode } from "react";
import { DropResult } from "react-beautiful-dnd";

export type DragAndDropListProps = {
  droppableId: string;
  children?: ReactNode;
  onDragEnd: (result: DropResult) => void;
};
