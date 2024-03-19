'use client';

import { useEditor } from '@/components/hooks/use-editor.js';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { cn, idGenerator } from '@/lib/utils.js';
import Icon from '@/components/ui/icon.js';
import { FormElements } from '@/components/form-elements.js';
import EditorElementWrapper from '@/components/editor-element-wrapper.js';

const EmptyState = () => (
  <div className="text-sm text-neutral-400 flex flex-col items-center justify-center h-full">
    <Icon name="MousePointerClick" className="w-6 h-6" />
    <p className="mt-3">
      <span className="font-semibold">Drag and drop</span> questions from the left-hand
      side to build your form.
    </p>
  </div>
);

const DropIndicator = () => (
  <div className="relative w-full h-full">
    <div className="absolute left-0 top-1/2 bg-blue-500 right-0 w-full h-1 z-1"></div>
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
      <Icon name="Plus" className="w-3 h-3" />
    </div>
  </div>
);

const Elements = ({ elements }) => (
  <div className="flex flex-col w-full gap-2 py-6 px-4">
    {elements.map((element) => (
      <EditorElementWrapper key={element.id} element={element} />
    ))}
  </div>
);

const FormEditor = () => {
  const { elements, addElement } = useEditor();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isEditorDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isEditorBtnElement = active.data?.current?.isEditorBtnElement;
      const isOverEditorArea = over.data?.current?.isEditorDropArea;
      const isSidebarBtnOverEditorArea = isEditorBtnElement && isOverEditorArea;

      // Primer escenario: si un botón de la barra lateral está siendo arrastrado sobre el área del editor
      if (isSidebarBtnOverEditorArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type].construct(idGenerator());

        addElement(elements.length, newElement);
      }
    },
  });

  return (
    <div className="pb-6 mt-16 w-full flex justify-center">
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-neutral-50 max-w-2xl min-h-64 px-3 rounded-xl flex flex-col flex-grow items-center overflow-y-auto',
          droppable.isOver && 'ring-4 ring-blue-500 ring-inset',
        )}
      >
        {!droppable.isOver && elements.length === 0 && <EmptyState />}
        {droppable.isOver && elements.length === 0 && <DropIndicator />}
        {elements.length > 0 && <Elements elements={elements} />}
      </div>
    </div>
  );
};

export default FormEditor;
