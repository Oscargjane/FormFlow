'use client';

import { useState, useEffect } from 'react';
import { useEditor } from '@/components/hooks/use-editor.js';
import FormEditor from '@/components/form-editor.js';
import { Spinner } from '@/components/ui/spinner.js';
import { set } from 'date-fns';

/**
 * FormBuilder es un componente que se encarga de construir un formulario.
 * Utiliza el hook useEditor para manejar el estado del editor.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.form - El formulario a construir.
 * @returns {JSX.Element} El componente FormBuilder.
 */
function FormBuilder({ form }) {
  const { setElements, setSelectedElement } = useEditor();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    const elements = form.fields;

    setElements(elements);
    setSelectedElement(null);

    const readyTimeout = setTimeout(() => setIsLoaded(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, isLoaded, setElements, setSelectedElement]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Spinner color="yellow" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full items-start justify-center relative rounded-xl overflow-hidden border-[0.5px] p-4 border-neutral-300 shadow-lg bg-neutral-100">
      <FormEditor />
    </div>
  );
}

export default FormBuilder;
