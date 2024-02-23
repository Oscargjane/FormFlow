import { Button } from '@/components/ui/button.js';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon.js';

/**
 * SidebarBtnElement es un componente que representa un botón en la barra lateral que puede ser arrastrado.
 * Recibe un objeto formElement como prop, que contiene la información del elemento del formulario que este botón representa.
 */
function SidebarBtnElement({ formElement }) {
  // se extrae el icono y la label del elemento del formulario
  const { icon, label } = formElement.editorBtnElement;

  // configuracion del boton para ser arrastrable
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
      className={cn(
        'bg-white rounded-md cursor-pointer border border-white shadow hover:shadow-md hover:shadow-neutral-400/50 min-w-10 min-h-20',
        draggable.isDragging && 'ring-2 ring-blue-500',
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className="w-full flex flex-col space-y-2 items-center justify-center">
        <div className="p-[0.5px] rounded bg-neutral-50 border-[0.5px]">
          <Icon name={icon} className="h-6 w-6" />
        </div>
        <p className="text-neutral-700 text-xs font-medium flex justify-center  text-center leading-3 h-6 items-center">
          {label}
        </p>
      </div>
    </Button>
  );
}

// export function SidebarBtnElementDragOverlay({ formElement = FormElements }) {
//   const { label, icon } = formElement.designerBtnElement;

//   return (
//     <Button
//       variant={'outline'}
//       className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
//     >
//       <Icon className="h-8 w-8 text-primary cursor-grab" />
//       <p className="text-xs">{label}</p>
//     </Button>
//   );
// }

export default SidebarBtnElement;
