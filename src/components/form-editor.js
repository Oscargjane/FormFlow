'use client';

import { useEditor } from '@/components/hooks/use-editor.js';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils.js';
import Icon from '@/components/ui/icon.js';

const FormEditor = () => {
  // se utiliza el hook useEditor para obtener los elementos del formulario y las funciones para manipularlos
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } =
    useEditor();

  // se utiliza el hook useDroppable para hacer que el componente sea un área donde se pueden soltar elementos
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isEditorDropArea: true },
  });

  // se define una función para renderizar el estado vacío del formulario
  const renderEmptyState = () => (
    <div className="text-sm text-neutral-400 flex flex-col items-center justify-center h-full">
      <Icon name="MousePointerClick" className="w-6 h-6" />
      <p className="mt-3">
        <span className="font-semibold">Drag and drop</span> questions from the left-hand
        side to build your form.
      </p>
    </div>
  );

  // se define una función para renderizar el indicador de que se puede soltar un elemento
  const renderDropIndicator = () => (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-1/2 bg-blue-500 right-0 w-full h-1 z-1"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
        <Icon name="Plus" className="w-3 h-3" />
      </div>
    </div>
  );

  // se define una función para renderizar los elementos del formulario
  const renderElements = () => (
    <div className="flex flex-col w-full gap-2 py-6 px-4">
      <p>Element</p>
    </div>
  );

  return (
    <div className="pb-6 mt-16 w-full flex justify-center">
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-neutral-50 max-w-2xl min-h-64 px-3 rounded-xl flex flex-col flex-grow items-center overflow-y-auto',
          droppable.isOver && 'ring-4 ring-blue-500 ring-inset',
        )}
      >
        {
          //Si no hay ningún elemento siendo arrastrado sobre el área droppable y no hay elementos en el formulario, renderizamos el estado vacío
          !droppable.isOver && elements.length === 0 && renderEmptyState()
        }
        {
          // Si hay un elemento siendo arrastrado sobre el área droppable y no hay elementos en el formulario, renderizamos el indicador de que se puede soltar un elemento
          droppable.isOver && elements.length === 0 && renderDropIndicator()
        }
        {
          // Si hay elementos en el formulario, los renderizamos
          elements.length > 0 && renderElements()
        }
      </div>
    </div>
  );
};

export default FormEditor;
