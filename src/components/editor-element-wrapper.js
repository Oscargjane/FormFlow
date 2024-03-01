'use client';

import { useState, useMemo } from 'react';
import { useEditor } from '@/components/hooks/use-editor.js';
import { useDraggable } from '@dnd-kit/core';
import { FormElements } from '@/components/form-elements.js';
import { cn } from '@/lib/utils.js';
import Icon from '@/components/ui/icon.js';
import { Button } from '@/components/ui/button.js';

/**
 * EditorElementWrapper es el componente que envuelve a un elemento de formulario en el editor.
 * Proporciona funcionalidad para seleccionar, eliminar y arrastrar el elemento.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.element - El elemento del formulario a envolver.
 */
const EditorElementWrapper = ({ element }) => {
  // Se usa el hook useEditor para obtener funciones y estados del editor
  const { removeElement, selectedElement, setSelectedElement } = useEditor();

  // Se define un estado para rastrear si el mouse está sobre el componente
  const [isHovered, setIsHovered] = useState(false);

  // Se define un objeto draggable para permitir que el elemento sea arrastrado
  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isEditorElement: true,
    },
  });

  // useMemo para optimización
  const EditorElement = useMemo(() => {
    if (!element || !FormElements[element.type]) {
      throw new Error(`No FormElement found for type ${element?.type}`);
    }
    return FormElements[element.type].formEditorComponent;
  }, [element]);

  if (draggable.isDragging) return null; // Si el elemento está siendo arrastrado, no renderiza nada

  if (!EditorElement) return null; // Si no hay un EditorElement, no renderiza nada

  // Manejadores de eventos
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        'group relative min-h-min flex flex-col items-center justify-center border-transparent hover:border-2 hover:border-blue-400 focus:border-2 hover:cursor-pointer',
        isHovered || selectedElement === element
          ? 'border-blue-400'
          : 'border-transparent',
        selectedElement === element && 'mt-8',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-7 min-h-full cursor-move flex justify-center items-center flex-shrink-0">
          <Icon
            name="GripVertical"
            className={cn(
              `${
                isHovered || selectedElement === element ? 'block' : 'hidden'
              } hover:block w-6 h-6 text-neutral-500 visibility[visible]`,
            )}
          />
        </div>
        <EditorElement elementInstance={element} />
      </div>

      {selectedElement === element && (
        <>
          <div className="absolute -top-1 right-0 transform -translate-y-full">
            <Button
              className="flex items-center justify-center h-6 space-x-0.5 px-2 py-1 -mr-0.5 rounded-sm text-xs text-red-500 border border-red-500 bg-red-300"
              variant={'drestructive'}
              onClick={(e) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(element.id);
              }}
            >
              <Icon name="X" className="h-4 w-4 stroke-2 text-red-500" />
              <span>Remove</span>
            </Button>
          </div>
          <div className="absolute top-0 -left-0.5 transform -translate-y-full bg-blue-500 text-white h-8 px-2 py-1 rounded-sm text-sm">
            <span>{element.type}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default EditorElementWrapper;
