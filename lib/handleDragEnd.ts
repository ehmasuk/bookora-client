import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const handleDragEnd = <T extends { id: string }>(event: DragEndEvent, data: T[]): T[] | undefined => {
  const { active, over } = event;
  if (active.id !== over?.id) {
    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over?.id);
    return arrayMove(data, oldIndex, newIndex);
  }
};

export default handleDragEnd;
