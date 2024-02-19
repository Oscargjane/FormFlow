import { getFormById } from '@/lib/actions/form.actions.js';
import FormEditor from '@/components/form-editor.js';

const EditorPage = async ({ params }) => {
  const { id } = params;

  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form not found');
  }
  return <FormEditor form={form} />;
};

export default EditorPage;
