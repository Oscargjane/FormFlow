import React from 'react';
import SidebarBtnElement from '@/components/element-btn-sidebar.js';
import { FormElements } from '@/components/form-elements.js';

const formElementsList = {
  'Display & Layout': [
    FormElements.TitleField,
    FormElements.ParagraphField,
    FormElements.DividerField,
  ],
  Choices: [FormElements.MultipleChoiceField],
  Text: [FormElements.ShortAnswerField, FormElements.LongAnswerField],
};

const FormElementsGroup = ({ category, formElements }) => {
  return (
    <div className="flex flex-col" key={category}>
      <p className="text-sm text-neutral-400 font-medium mt-6">{category}</p>
      <div className="grid grid-cols-3 gap-2 mt-3 gap-y-4">
        {formElements.map((formElement) => (
          <SidebarBtnElement key={formElement.type} formElement={formElement} />
        ))}
      </div>
    </div>
  );
};

function FormElementsSidebar() {
  return (
    <aside className="w-full h-full bg-neutral-50 flex flex-col border-r border-neutral-300  pt-4 px-3 pb-6 max-w-[300px] min-w-[270px]">
      {Object.entries(formElementsList).map(([category, formElements]) => (
        <FormElementsGroup
          key={category}
          category={category}
          formElements={formElements}
        />
      ))}
    </aside>
  );
}

export default React.memo(FormElementsSidebar);
