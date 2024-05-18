import { Button } from '@/components/ui/button.js';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon.js';
import { memo } from 'react';

const buttonClass =
  'bg-white rounded-md cursor-pointer border border-white shadow hover:shadow-md hover:shadow-neutral-400/50 hover:bg-white min-w-10 min-h-20 py-1 transition-shadow duration-200';
const textClass =
  'text-neutral-700 text-xs font-medium h-full flex justify-center text-center leading-4 items-center overflow-hidden overflow-ellipsis whitespace-normal';

const SidebarBtnElement = memo(({ formElement }) => {
  const { icon, label } = formElement.editorBtnElement;

  const draggable = useDraggable({
    id: `editor-btn----${formElement.type}`,
    data: {
      type: formElement.type,
      isEditorBtnElement: true,
    },
  });

  return (
    <Button
      key={formElement.type}
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(buttonClass, draggable.isDragging && 'ring-2 ring-blue-500')}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className="w-full flex flex-col space-y-2 items-center justify-center">
        <div className="p-[0.5px] rounded bg-neutral-50 border-[0.5px]">
          <Icon name={icon} className="h-6 w-6" />
        </div>
        <p className={textClass}>{label}</p>
      </div>
    </Button>
  );
});

export default SidebarBtnElement;
