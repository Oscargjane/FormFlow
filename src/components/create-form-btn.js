'use client';

import { formSchema } from '@/schemas/form.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createForm } from '@/lib/actions/form.actions.js';
import Icon from '@/components/ui/icon.js';
import { Spinner } from '@/components/ui/spinner.js';
import { Button } from '@/components/ui/button.js';
import { toast } from '@/components/ui/use-toast.js';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.js';
import { Input } from '@/components/ui/input.js';

/**
 * CreateFormBtn Component
 *
 * Este componente muestra un botón que abre un diálogo para que el usuario pueda ingresar el nombre de un nuevo formulario.
 * Cuando se envía el formulario, llama a la acción createForm con los valores del formulario.
 * Si el formulario se crea correctamente, redirige al usuario a la página de edición del formulario.
 * Si ocurre un error al crear el formulario, registra el error y muestra un mensaje de error al usuario.
 *
 * @component
 * @example
 * return <CreateFormBtn />
 */
const CreateFormBtn = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const { id } = await createForm(values);
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });
      router.push(`/editor/${id}/edit`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
          <Icon name="Plus" className="w-4 h-4" />
          <span>New form</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Name your form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
            aria-label="Continue to create form"
          >
            {!form.formState.isSubmitting && <span>Continue</span>}
            {form.formState.isSubmitting && (
              <>
                <Spinner size="4" />
                <span className="ml-2">Please wait</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
