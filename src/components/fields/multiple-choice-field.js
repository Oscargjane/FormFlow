'use client';

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor } from '@/components/hooks/use-editor.js';
import { Checkbox } from '@/components/ui/checkbox.js';
import { Input } from '@/components/ui/input.js';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form.js';

const TYPE = 'MultipleChoiceField';
const INITIAL_VALUE = {
  question: '',
  options: [
    { name: 'option-1', value: 'Option 1' },
    { name: 'option-2', value: 'Option 2' },
  ],
};
const EXTRA_ATTRIBUTES = {
  label: 'Multiple Choice Field',
  questionPlaceholder: 'Type your question here',
};

const CheckboxOption = ({
  option,
  index,
  applyChanges,
  isEditing,
  register,
  watch,
  setValue,
}) => {
  const fieldName = `options[${index}].value`;
  register(fieldName);
  const fieldValue = watch(fieldName);

  return (
    <div className="flex items-center">
      <Checkbox name={fieldName} checked={fieldValue} disabled={isEditing} />
      {isEditing ? (
        <Input
          name={fieldName}
          className="ml-3 min-w-min"
          value={fieldValue}
          onChange={(e) => {
            setValue(fieldName, e.target.value);
            applyChanges();
          }}
        />
      ) : (
        <span className="ml-3">{option.value}</span>
      )}
    </div>
  );
};

const QuestionInput = ({ control, setValue, applyChanges }) => (
  <FormField
    control={control}
    name="question"
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            {...field}
            onChange={(e) => {
              setValue(field.name, e.target.value);
              applyChanges();
            }}
            placeholder={EXTRA_ATTRIBUTES.questionPlaceholder}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

const FormEditorComponent = ({ elementInstance: element }) => {
  const { control, register, getValues, watch, setValue, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: INITIAL_VALUE,
  });
  const { updateElement } = useEditor();

  useEffect(() => {
    reset(element.value);
  }, [element, reset]);

  const applyChanges = useCallback(() => {
    const values = getValues();

    const updatedElement = {
      ...element,
      value: values,
      extraAttributes: { ...element.extraAttributes },
    };

    updateElement(element.id, updatedElement);
  }, [getValues, element, updateElement]);

  return (
    <Form {...{ control, register, getValues, watch }}>
      <form className="w-full">
        <QuestionInput
          control={control}
          setValue={setValue}
          applyChanges={applyChanges}
        />
        <div>
          {watch('options').map((option, index) => (
            <CheckboxOption
              key={index}
              isEditing={true}
              index={index}
              option={option}
              applyChanges={applyChanges}
              register={register}
              watch={watch}
              setValue={setValue}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

const FormComponent = ({ elementInstance: element }) => {
  const { value } = element;
  return (
    <div>
      {value.map((option, index) => (
        <p key={index}>{option}</p>
      ))}
    </div>
  );
};

export const MultipleChoiceFieldFormElement = {
  type: TYPE,
  construct: (id) => ({
    id,
    type: TYPE,
    value: INITIAL_VALUE,
    extraAttributes: { ...EXTRA_ATTRIBUTES },
  }),
  editorBtnElement: {
    icon: 'SquareGanttChart',
    label: 'Multiple Choice',
  },
  formEditorComponent: FormEditorComponent,
  formComponent: FormComponent,
};
