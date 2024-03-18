import { getForms } from '@/lib/actions/form.actions.js';
import FormCards from '@/components/form-cards.js';
import CreateFormBtn from '@/components/create-form-btn.js';
import Icon from '@/components/ui/icon.js';

const Dashboard = async () => {
  const forms = await getForms();
  return (
    <div className="px-8 py-6 flex flex-col gap-3">
      {forms.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-24">
          <Icon name="FolderPlus" className="h-10 w-10 text-neutral-400 stroke-1" />
          <h2 className="text-neutral-500 justify-center flex items-center tracking-wide mt-4 text-sm mb-6">
            No forms in workspace yet
          </h2>

          <CreateFormBtn />
        </div>
      )}
      {forms.length > 0 && (
        <>
          <h2 className="text-neutral-500 text-xs font-medium uppercase tracking-wide">
            All forms
          </h2>
          <FormCards forms={forms} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
