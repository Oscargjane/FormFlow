import { useDraggable } from '@dnd-kit/core';

export const useDraggableElement = (element) => {
  return useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isEditorElement: true,
    },
  });
};
