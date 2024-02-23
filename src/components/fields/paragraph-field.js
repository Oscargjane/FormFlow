import { Label } from '@/components/ui/label.js';

// se define el tipo de elemento
const type = 'ParagraphField';

// se define los atributos extrass que tendrá el elemento
const extraAttributes = {
  text: 'Text here',
};

/**
 * FormEditorComponent es un componente que se utiliza para editar el elemento en el editor de formularios.
 * Recibe un objeto elementInstance como prop, que contiene los atributos del elemento.
 */
const FormEditorComponent = ({ elementInstance }) => {
  const element = elementInstance;
  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Paragraph field</Label>
      <p className="truncate">{text}</p>
    </div>
  );
};

/**
 * FormComponent es un componente que se utiliza para renderizar el elemento en el formulario final.
 * Recibe un objeto elementInstance como prop, que contiene los atributos del elemento.
 */
const FormComponent = ({ elementInstance }) => {
  const element = elementInstance;
  const { text } = element.extraAttributes;

  return <p className="text-muted-foreground">{text}</p>;
};

export const ParagraphFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  editorBtnElement: {
    icon: 'GanttChartSquare',
    label: 'Paragraph',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
