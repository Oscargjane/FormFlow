import FormEditor from '@/components/form-editor.js';

function FormBuilder() {
  // Renderiza un div que contiene el componente FormEditor
  // El componente FormEditor es donde ocurre la mayor parte de la lógica de edición del formulario
  return (
    <div className="flex w-full h-full items-start justify-center relative rounded-xl overflow-hidden border-[0.5px] p-4 border-neutral-300 shadow-lg bg-neutral-100">
      <FormEditor />
    </div>
  );
}

export default FormBuilder;
