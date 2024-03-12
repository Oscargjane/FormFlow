import { useTransition } from 'react';
import { Button } from '@/components/ui/button.js';
import { useEditor } from '@/components/hooks/use-editor.js';
import { updateFormContent } from '@/lib/actions/form.actions.js';
import { toast } from '@/components/ui/use-toast.js';
import Icon from '@/components/ui/icon.js';
import { Spinner } from '@/components/ui/spinner.js';

/**
 * Botón para guardar el contenido del formulario.
 *
 * @param {Object} props Las props del componente.
 * @param {number} props.id El ID del formulario a guardar.
 */
const SaveFormBtn = ({ id }) => {
  const { elements } = useEditor();
  const [isPending, startTransition] = useTransition();

  const handleUpdateFormContent = async () => {
    startTransition(() => {
      updateFormContent(Number(id), elements)
        .then(() => {
          toast({
            title: 'Success',
            description: 'Your form has been saved',
          });
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error.message || 'Something went wrong',
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Button variant={'outline'} disabled={isPending} onClick={handleUpdateFormContent}>
      {isPending ? (
        <Spinner size="4" color="neutral" />
      ) : (
        <Icon name="Save" className="w-4 h-4" />
      )}
      <span className="ml-2">Save</span>
    </Button>
  );
};

export default SaveFormBtn;
