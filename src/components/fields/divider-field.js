import { Separator } from '@/components/ui/separator.js';

const type = 'DividerField';

const FormEditorComponent = () => (
  <div className="w-full">
    <Separator />
  </div>
);

const FormComponent = () => <Separator />;

export const DividerFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
  }),
  editorBtnElement: {
    icon: 'Minus',
    label: 'Separator',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
