import { Label } from '@/components/ui/label.js';

// se definen los atributos extra que tendrá el elemento
const extraAttributes = {
  title: 'Title field',
};

// se define el tipo de elemento
const type = 'TitleField';

/**
 * FormEditorComponent es un componente que se utiliza para editar el elemento en el editor de formularios.
 * Recibe un objeto elementInstance como prop, que contiene los atributos del elemento.
 */
const FormEditorComponent = ({ elementInstance }) => {
  const { title } = elementInstance.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
};

/**
 * FormComponent es un componente que se utiliza para renderizar el elemento en el formulario final.
 * Recibe un objeto elementInstance como prop, que contiene los atributos del elemento.
 */
const FormComponent = ({ elementInstance }) => {
  const { title } = elementInstance.extraAttributes;
  return <p className="text-xl">{title}</p>;
};

// TO-DO: Implement PropertiesComponent in the future to allow users to edit the title field

// se exporta el elemento
export const TitleFieldFormElement = {
  type,
  // la función construct crea una nueva instancia de este componente
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  // El objeto designerBtnElement define cómo se ve el botón de este componente en el editor de formularios
  editorBtnElement: {
    icon: 'Heading1',
    label: 'Title',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
