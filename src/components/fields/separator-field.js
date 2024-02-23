import { Label } from '@/components/ui/label.js';
import { Separator } from '@/components/ui/separator.js';

// se define el tipo de elemento
const type = 'SeparatorField';

/**
 * FormEditorComponent es un componente que se utiliza para editar el elemento en el editor de formularios.
 * Recibe un objeto elementInstance como prop, que contiene los atributos del elemento.
 */
const FormEditorComponent = ({ elementInstance }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
};

/**
 * FormComponent es un componente que se utiliza para renderizar el elemento en el formulario final.
 * Recibe un objeto elementInstance como prop, que contiene los atributos del elemento.
 */
const FormComponent = ({ elementInstance }) => {
  return <Separator />;
};

export const SeparatorFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: 'Minus',
    label: 'Separator',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
