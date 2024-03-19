'use client';

import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Input } from '@/components/ui/input.js';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form.js';

const type = 'TitleField';
const INITIAL_VALUE = '';

const extraAttributes = {
  label: 'Title field',
  placeholderText: 'Type here...',
};

const FormFieldComponent = ({ control, applyChanges }) => (
  <FormField
    control={control}
    name="title"
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              applyChanges();
            }}
            placeholder={extraAttributes.placeholderText}
            className="resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 border-0 rounded-none bg-transparent w-full min-h-min placeholder:text-neutral-400 placeholder:text-base text-2xl text-neutral-800 focus-visible:ring-offset-0 focus-visible:ring-0 "
          />
        </FormControl>
      </FormItem>
    )}
  />
);

const FormEditorComponent = ({ elementInstance: element }) => {
  if (!element || !element.extraAttributes) {
    throw new Error('Error: Element or element.extraAttributes is undefined');
  }
  const { updateElement } = useEditor();

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: INITIAL_VALUE,
    },
  });

  useEffect(() => {
    form.reset({ title: element.value });
  }, [element, form]);

  const applyChanges = useCallback(() => {
    const values = form.getValues();
    const { title } = values;

    const updatedElement = {
      ...element,
      value: title,
      extraAttributes: { ...element.extraAttributes },
    };
    updateElement(element.id, updatedElement);
  }, [form, element, updateElement]);

  return (
    <Form {...form}>
      <form className="w-full">
        <FormFieldComponent control={form.control} applyChanges={applyChanges} />
      </form>
    </Form>
  );
};

const FormComponent = ({ elementInstance: element }) => {
  const { value } = element;
  return <p>{value}</p>;
};

export const TitleFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    value: INITIAL_VALUE,
    extraAttributes,
  }),
  editorBtnElement: {
    icon: 'Heading1',
    label: 'Title',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
