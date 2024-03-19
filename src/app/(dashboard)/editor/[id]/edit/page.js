import { getFormById } from '@/lib/actions/form.actions.js';
import FormBuilder from '@/components/form-builder.js';

const EditorPage = async ({ params }) => {
  const { id } = params;

  const form = await getFormById(id);

  if (!form) {
    throw new Error('Form not found');
  }

  return <FormBuilder form={form} />;
};

export default EditorPage;
