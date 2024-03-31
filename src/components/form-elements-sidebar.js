import SidebarBtnElement from '@/components/element-btn-sidebar.js';
import { FormElements } from '@/components/form-elements.js';

const formElementsList = [
  FormElements.TitleField,
  FormElements.ParagraphField,
  FormElements.DividerField,
  FormElements.MultipleChoiceField,
];

function FormElementsSidebar() {
  return (
    <aside className="w-full h-full bg-neutral-50 flex flex-col border-r border-neutral-300  pt-4 px-3 pb-6 max-w-[300px] min-w-[270px]">
      <div className="flex flex-col">
        <p className="text-sm text-neutral-400 font-medium mt-6">Display & Layout</p>
        <div className="grid grid-cols-3 gap-2 mt-3 gap-y-4">
          {formElementsList.map((formElement) => (
            <SidebarBtnElement key={formElement.type} formElement={formElement} />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FormElementsSidebar;
