'use client';

import { useEffect, useCallback, memo } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Input } from '@/components/ui/input.js';
import { Form, FormItem, FormControl } from '@/components/ui/form.js';
import QuestionInput from '@/components/ui/question-input.js';

const TYPE = 'ShortAnswerField';
const INITIAL_VALUE = {
  question: '',
  answer: '',
};
const EXTRA_ATTRIBUTES = {
  label: 'Short Answer Field',
  questionPlaceholder: 'Type your question here',
};

const FormEditorComponent = memo(({ elementInstance: element }) => {
  if (!element || !element.value) {
    return null;
  }

  const { control, getValues, setValue, register, watch, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: INITIAL_VALUE,
  });
  const { updateElement } = useEditor();

  useEffect(() => {
    reset(
      element.value && element.value.answer !== undefined ? element.value : INITIAL_VALUE,
    );
  }, [element.value, reset]);

  const applyChanges = useCallback(() => {
    const values = getValues();
    const updatedElement = {
      ...element,
      value: values,
      extraAttributes: { ...element.extraAttributes },
    };

    updateElement(element.id, updatedElement);
  }, [getValues, element, updateElement]);

  const fieldName = 'short-answer';
  register(fieldName);
  const fieldValue = watch(fieldName);

  const handleChange = (e) => {
    setValue(fieldName, e.target.value);
    applyChanges();
  };

  return (
    <Form {...{ control, register, getValues, watch }}>
      <form className="w-full pl-1 pr-4 py-3">
        <FormItem>
          <FormControl>
            <QuestionInput
              register={register}
              setValue={setValue}
              watch={watch}
              applyChanges={applyChanges}
              placeholder={EXTRA_ATTRIBUTES.questionPlaceholder}
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormControl>
            <Input
              name={fieldName}
              value={fieldValue}
              onChange={handleChange}
              className="resize-none border border-neutral-300 rounded bg-transparent w-full min-h-min text-sm text-neutral-800 shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-2 focus:border-blue-500"
            />
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
});

const FormComponent = memo(({ elementInstance: element }) => {
  if (!element || !element.value) {
    return null;
  }
  const { question, answer } = element.value;

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-lg font-medium text-neutral-700">{question}</h2>
      <p className="mt-2 text-sm text-neutral-500">{answer}</p>
    </div>
  );
});

export const ShortAnswerFieldFormElement = {
  type: TYPE,
  construct: (id) => ({
    id,
    type: TYPE,
    value: INITIAL_VALUE,
    extraAttributes: EXTRA_ATTRIBUTES,
  }),
  editorBtnElement: {
    icon: 'Equal',
    label: 'Short answer',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
