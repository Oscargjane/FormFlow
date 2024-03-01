'use client';

import { useEditor } from '@/components/hooks/use-editor.js';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { cn, idGenerator } from '@/lib/utils.js';
import Icon from '@/components/ui/icon.js';
import { FormElements } from '@/components/form-elements.js';
import EditorElementWrapper from '@/components/editor-element-wrapper.js';

/**
 * FormEditor es un componente que permite a los usuarios crear formularios arrastrando y soltando elementos.
 * Utiliza varios hooks y componentes para proporcionar esta funcionalidad.
 */
const FormEditor = () => {
  // useEditor es un hook personalizado que proporciona los elementos del formulario y las funciones para manipularlos
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } =
    useEditor();

  // useDroppable es un hook que hace que el componente sea un área donde se pueden soltar elementos
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: { isEditorDropArea: true },
  });

  // useDndMonitor es un hook que permite manejar eventos de arrastrar y soltar
  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event; // Extrae los objetos 'active' y 'over' del evento
      if (!active || !over) return; // Si no hay un elemento activo o un elemento sobre el que se está arrastrando, termina la función

      // Verifica si el elemento activo es un botón del editor
      const isEditorBtnElement = active.data?.current?.isEditorBtnElement;
      // Verifica si el elemento sobre el que se está arrastrando es el área del editor
      const isOverEditorArea = over.data?.current?.isEditorDropArea;

      // Verifica si un botón de la barra lateral está siendo arrastrado sobre el área del editor
      const isSidebarBtnOverEditorArea = isEditorBtnElement && isOverEditorArea;

      // Primer escenario: si un botón de la barra lateral está siendo arrastrado sobre el área del editor
      if (isSidebarBtnOverEditorArea) {
        const type = active.data?.current?.type; // Extrae el tipo del elemento activo

        // Crea un nuevo elemento del tipo extraído
        const newElement = FormElements[type].construct(idGenerator());

        // Añade el nuevo elemento al final de la lista de elementos
        addElement(elements.length, newElement);
        return;
      }
    },
  });

  // Función para renderizar el estado vacío del formulario
  const renderEmptyState = () => (
    <div className="text-sm text-neutral-400 flex flex-col items-center justify-center h-full">
      <Icon name="MousePointerClick" className="w-6 h-6" />
      <p className="mt-3">
        <span className="font-semibold">Drag and drop</span> questions from the left-hand
        side to build your form.
      </p>
    </div>
  );

  // Función para renderizar el indicador de que se puede soltar un elemento
  const renderDropIndicator = () => (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-1/2 bg-blue-500 right-0 w-full h-1 z-1"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
        <Icon name="Plus" className="w-3 h-3" />
      </div>
    </div>
  );

  // Función para renderizar los elementos del formulario
  const renderElements = () => (
    <div className="flex flex-col w-full gap-2 py-6 px-4">
      {elements.map((element) => (
        <EditorElementWrapper key={element.id} element={element} />
      ))}
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
