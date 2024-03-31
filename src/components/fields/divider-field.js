import { Separator } from '@/components/ui/separator.js';

const TYPE = 'DividerField';

const FormEditorComponent = () => (
  <div className="w-full">
    <Separator />
  </div>
);

const FormComponent = () => <Separator />;

export const DividerFieldFormElement = {
  type: TYPE,
  construct: (id) => ({
    id,
    type: TYPE,
  }),
  editorBtnElement: {
    icon: 'Minus',
    label: 'Divider',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
