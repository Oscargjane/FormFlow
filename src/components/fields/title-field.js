'use client';

import { useEffect, useCallback, memo } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Input } from '@/components/ui/input.js';
import { Form, FormItem, FormControl } from '@/components/ui/form.js';

const TYPE = 'TitleField';
const INITIAL_VALUE = '';
const EXTRA_ATTRIBUTES = {
  label: 'Title Field',
  placeholderText: 'Type here...',
};

const FormEditorComponent = memo(({ elementInstance: element }) => {
  const { control, getValues, setValue, register, watch, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: INITIAL_VALUE,
    },
  });

  const { updateElement } = useEditor();

  const fieldName = 'title';
  register(fieldName);
  const fieldValue = watch(fieldName);

  useEffect(() => {
    reset({ [fieldName]: element.value });
  }, [element.value, reset, fieldName]);

  const applyChanges = useCallback(() => {
    if (!element) return;

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

  if (!element || element.value == undefined) {
    return null;
  }

  return (
    <Form {...{ control, register, getValues, watch }}>
      <form className="w-full">
        <FormItem>
          <FormControl>
            <Input
              name={fieldName}
              value={fieldValue}
              onChange={handleChange}
              placeholder={EXTRA_ATTRIBUTES.placeholderText}
              className="resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 border-0 rounded-none bg-transparent w-full min-h-min placeholder:text-neutral-400 placeholder:text-base text-2xl text-neutral-800 focus-visible:ring-offset-0 focus-visible:ring-0 "
            />
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
});

FormEditorComponent.displayName = 'FormEditorComponent';

const FormComponent = memo(({ elementInstance: element }) => {
  if (!element || element.value == undefined) {
    return null;
  }

  const { value } = element;
  return <p>{value}</p>;
});

FormComponent.displayName = 'FormComponent';

export const TitleFieldFormElement = {
  type: TYPE,
  construct: (id) => ({
    id,
    type: TYPE,
    value: INITIAL_VALUE,
    extraAttributes: { ...EXTRA_ATTRIBUTES },
  }),
  editorBtnElement: {
    icon: 'Heading1',
    label: 'Title',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
