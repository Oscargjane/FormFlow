import { Separator } from '@/components/ui/separator.js';

const TYPE = 'DividerField';
const EXTRA_ATTRIBUTES = {
  label: 'Divider Field',
};

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
    extraAttributes: { ...EXTRA_ATTRIBUTES },
  }),
  editorBtnElement: {
    icon: 'Minus',
    label: 'Divider',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
