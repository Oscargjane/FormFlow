'use client';

import { useCallback, useEffect, memo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Button } from '@/components/ui/button.js';
import { Form, FormItem, FormControl } from '@/components/ui/form.js';
import QuestionInput from '@/components/ui/question-input.js';
import CheckboxOption from '@/components/ui/checkbox-option.js';
import { idGenerator } from '@/lib/utils.js';

const TYPE = 'MultipleChoiceField';
const INITIAL_VALUE = {
  question: '',
  options: [
    {
      id: idGenerator(),
      value: 'Option 1',
    },
    {
      id: idGenerator(),
      value: 'Option 2',
    },
  ],
};

const EXTRA_ATTRIBUTES = {
  label: 'Multiple Choice Field',
  questionPlaceholder: 'Type your question here',
};

const FormEditorComponent = memo(({ elementInstance: element }) => {
  const { control, register, getValues, watch, setValue, reset } = useForm({
    defaultValues: { options: INITIAL_VALUE.options },
  });
  const { updateElement } = useEditor();

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  useEffect(() => {
    reset(element.value);
  }, [element.value, reset]);

  const applyChanges = useCallback(() => {
    if (!element) return;

    const values = getValues();

    const updatedElement = {
      ...element,
      value: values,
      extraAttributes: { ...element.extraAttributes },
    };

    updateElement(element.id, updatedElement);
  }, [getValues, element, updateElement]);

  const handleAddOption = useCallback(() => {
    append({ id: idGenerator(), value: `Option ${fields.length + 1}` });

    applyChanges();
  }, [append, fields.length, applyChanges]);

  const handleRemoveOption = useCallback(
    (index) => {
      remove(index);
      applyChanges();
    },
    [remove, applyChanges],
  );

  if (!element || element.value == undefined) {
    return null;
  }

  return (
    <Form {...{ control, register, getValues, watch }}>
      <form className="w-full pl-1 pr-4">
        <FormItem>
          <FormControl>
            <QuestionInput
              register={register}
              watch={watch}
              setValue={setValue}
              applyChanges={applyChanges}
              placeholder={EXTRA_ATTRIBUTES.questionPlaceholder}
            />
          </FormControl>
        </FormItem>
        <div className="flex flex-col items-start w-full gap-4">
          {fields && fields.length > 0 ? (
            fields.map((option, index) => (
              <CheckboxOption
                key={option.id}
                index={index}
                option={option}
                control={control}
                register={register}
                watch={watch}
                setValue={setValue}
                applyChanges={applyChanges}
                onRemove={handleRemoveOption}
              />
            ))
          ) : (
            <p className="text-neutral-500 px-3">No options</p>
          )}
          <Button
            type="button"
            variant="link"
            onClick={handleAddOption}
            className="text-blue-500 underline"
          >
            Add option
          </Button>
        </div>
      </form>
    </Form>
  );
});

FormEditorComponent.displayName = 'FormEditorComponent';

const FormComponent = memo(({ elementInstance: element }) => {
  if (!element || element.value == undefined) {
    return null;
  }

  const { options } = element.value;
  return (
    <div>
      {options.map(({ id, value }) => (
        <p key={id}>{value}</p>
      ))}
    </div>
  );
});

FormComponent.displayName = 'FormComponent';

export const MultipleChoiceFieldFormElement = {
  type: TYPE,
  construct: (id) => ({
    id,
    type: TYPE,
    value: INITIAL_VALUE,
    extraAttributes: { ...EXTRA_ATTRIBUTES },
  }),
  editorBtnElement: {
    icon: 'CircleEllipsis',
    label: 'Multiple Choice',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
