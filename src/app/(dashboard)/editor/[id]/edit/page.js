import { getFormById } from '@/lib/actions/form.actions.js';
import FormBuilder from '@/components/form-builder.js';

const EditorPage = async ({ params }) => {
  const { id } = params; // se extrae el id de los parámetros

  const form = await getFormById(id); // se obtiene el formulario con el id proporcionado

  // Si no se encuentra el formulario, lanza un error
  if (!form) {
    throw new Error('Form not found');
  }

  return <FormBuilder form={form} />;
};

export default EditorPage;
