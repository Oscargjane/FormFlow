'use client';

import { useEffect, useCallback, memo } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Textarea } from '@/components/ui/textarea.js';
import { Form, FormItem, FormControl } from '@/components/ui/form.js';

const TYPE = 'ParagraphField';
const INITIAL_VALUE = '';
const EXTRA_ATTRIBUTES = {
  label: 'Paragraph Field',
  placeholderText: 'Type here...',
};

const FormEditorComponent = memo(({ elementInstance: element }) => {
  if (!element || element.value === undefined) {
    return null;
  }

  const { control, getValues, setValue, register, watch, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      text: INITIAL_VALUE,
    },
  });
  const { updateElement } = useEditor();

  const fieldName = 'paragraph';
  register(fieldName);
  const fieldValue = watch(fieldName);

  useEffect(() => {
    reset({ [fieldName]: element.value });
  }, [element.value, reset, fieldName]);

  const applyChanges = useCallback(() => {
    const values = getValues();

    const updatedElement = {
      ...element,
      value: values[fieldName],
      extraAttributes: { ...element.extraAttributes },
    };
    updateElement(element.id, updatedElement);
  }, [getValues, element, updateElement, fieldName]);

  const handleChange = (e) => {
    setValue(fieldName, e.target.value);
    applyChanges();
  };

  return (
    <Form {...{ control, register, getValues, watch }}>
      <form className="w-full">
        <FormItem>
          <FormControl>
            <Textarea
              name={fieldName}
              value={fieldValue}
              rows={1}
              onChange={handleChange}
              placeholder={EXTRA_ATTRIBUTES.placeholderText}
              className="resize-none focus:outline-none focus:ring-0 border-0 rounded-none bg-transparent w-full min-h-min placeholder:text-neutral-400 placeholder:text-base text-base text-neutral-800"
            />
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
});

const FormComponent = memo(({ elementInstance: element }) => {
  if (!element || element.value === undefined) {
    return null;
  }

  const { value } = element;
  return <p>{value}</p>;
});

export const ParagraphFieldFormElement = {
  type: TYPE,
  construct: (id) => ({
    id,
    type: TYPE,
    value: INITIAL_VALUE,
    extraAttributes: { ...EXTRA_ATTRIBUTES },
  }),
  editorBtnElement: {
    icon: 'SquareGanttChart',
    label: 'Paragraph',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
