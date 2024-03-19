'use client';

import { useEditor } from '@/components/hooks/use-editor.js';
import { useDraggableElement } from '@/components/hooks/use-draggable.js';
import { FormElements } from '@/components/form-elements.js';
import { cn } from '@/lib/utils.js';
import Icon from '@/components/ui/icon.js';
import { Button } from '@/components/ui/button.js';
import { useState } from 'react';

/**
 * EditorElementWrapper es el componente que envuelve a un elemento de formulario en el editor.
 * Proporciona funcionalidad para seleccionar, eliminar y arrastrar el elemento.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.element - El elemento del formulario a envolver.
 */
const EditorElementWrapper = ({ element }) => {
  const { removeElement, selectedElement, setSelectedElement } = useEditor();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const draggable = useDraggableElement(element);

  const EditorElement = FormElements[element.type]?.formEditorComponent;

  if (draggable.isDragging || !EditorElement) return null;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeElement(element.id);
  };

  const isSelected = selectedElement === element || isFocused;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        'group relative min-h-min flex flex-col items-center justify-center border-2 hover:cursor-pointer',
        isSelected && 'border-blue-400 mt-8',
        !isSelected && 'border-transparent hover:border-blue-300',
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
              'block w-6 h-6 text-neutral-500',
              !isHovered && !isSelected && 'hidden',
            )}
          />
        </div>
        <EditorElement
          elementInstance={element}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {isSelected && (
        <>
          <div className="absolute -top-1 right-0 transform -translate-y-full">
            <Button
              className="flex items-center justify-center h-6 space-x-0.5 px-2 py-1 -mr-0.5 rounded-sm text-xs text-red-500 border border-red-500 bg-red-200 hover:bg-red-100 hover:text-red-500"
              variant={'outline'}
              onClick={handleRemoveClick}
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
