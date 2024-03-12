import { Spinner } from '@/components/ui/spinner.js';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner color="yellow" />
    </div>
  );
};

export default Loading;
