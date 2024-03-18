'use client';

import { updateFormTitle } from '@/lib/actions/form.actions.js';
import { formSchema } from '@/schemas/form.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const RenameFormBtn = ({ formId, onClick }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values) => {
    const { title } = values;

    if (!title) {
      toast({
        title: 'Error',
        description: 'Form name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateFormTitle(formId, title);
      toast({
        title: 'Success',
        description: 'Form renamed successfully',
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full rounded-none bg-transparent text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:ring-0 focus-visible:ring-0">
          <span>Rename</span>
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
                    <Input {...field} aria-label="Form title" />
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
            className="w-full mt-4 "
            aria-label="Continue to rename form"
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

export default RenameFormBtn;
