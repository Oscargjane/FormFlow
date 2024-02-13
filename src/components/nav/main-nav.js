import Breadcrumb from '@/components/nav/breadcrumb.js';
import { Button } from '@/components/ui/button.js';
import Icon from '@/components/ui/icon.js';

const MainNav = () => {
  return (
    <nav className="h-[74px] flex justify-between items-center p-5 bg-white border-b border-neutral-200">
      <Breadcrumb />
      <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
        <Icon name="Plus" className="w-4 h-4" />
        <span>New form</span>
      </Button>
    </nav>
  );
};

export default MainNav;
