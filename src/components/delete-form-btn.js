'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteForm } from '@/lib/actions/form.actions.js';
import { Button } from '@/components/ui/button.js';
import { toast } from '@/components/ui/use-toast.js';
import { Spinner } from '@/components/ui/spinner.js';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.js';
import { Label } from '@/components/ui/label.js';
import { Input } from '@/components/ui/input.js';
import { truncateTitle } from '@/lib/utils.js';

const DeleteFormBtn = ({ formId, formTitle }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteForm(formId);
      toast({
        title: 'Success',
        description: 'Form deleted successfully',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-none bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition-colors">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Delete this form?</DialogTitle>
        </DialogHeader>
        <p className="text-sm mt-1">
          You're about to delete{' '}
          <span className="font-semibold">{truncateTitle(formTitle)}</span> and
          <span className="font-semibold"> all the responses </span>
          stored in FormFlowApp for this form. It will be{' '}
          <span className="text-red-500 font-semibold">gone forever</span> and we won't be
          able to recover it.
        </p>
        <Label className="flex items-center gap-2 mt-4">
          <Input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="h-4 w-4"
            aria-label="Confirmation checkbox"
          />
          <span className="text-base font-normal">
            Yes, delete "{truncateTitle(formTitle)}"
          </span>
        </Label>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            disabled={!isChecked}
            className="mt-4"
            aria-label="Delete form"
            variant="destructive"
          >
            {!isDeleting && <span>Delete form</span>}
            {isDeleting && (
              <>
                <Spinner size="4" color="white" />
                <span className="ml-2">Please wait</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFormBtn;
