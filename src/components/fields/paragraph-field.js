'use client';

import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Textarea } from '@/components/ui/textarea.js';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form.js';

const type = 'ParagraphField';
const INITIAL_VALUE = '';

const extraAttributes = {
  label: 'Paragraph field',
  placeholderText: 'Type here...',
};

const FormFieldComponent = ({ control, applyChanges }) => (
  <FormField
    control={control}
    name="text"
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Textarea
            {...field}
            rows={1}
            onChange={(e) => {
              field.onChange(e.target.value);
              applyChanges();
            }}
            placeholder={extraAttributes.placeholderText}
            className="resize-none focus:outline-none focus:ring-0 border-0 rounded-none bg-transparent w-full min-h-min placeholder:text-neutral-400 placeholder:text-base text-base text-neutral-800"
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
      text: INITIAL_VALUE,
    },
  });

  useEffect(() => {
    form.reset({ text: element.value });
  }, [element, form]);

  const applyChanges = useCallback(() => {
    const values = form.getValues();
    const { text } = values;

    const updatedElement = {
      ...element,
      value: text,
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

export const ParagraphFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    value: INITIAL_VALUE,
    extraAttributes,
  }),
  editorBtnElement: {
    icon: 'GanttChartSquare',
    label: 'Paragraph',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
