import { getForms } from '@/lib/actions/form.actions.js';
import FormCards from '@/components/form-cards.js';

const Dashboard = async () => {
  const forms = await getForms();
  return (
    <div className="px-8 py-6 flex flex-col gap-3">
      <h2 className="text-neutral-500 text-xs font-medium uppercase tracking-wide">
        All forms
      </h2>
      <FormCards forms={forms} />
    </div>
  );
};

export default Dashboard;
