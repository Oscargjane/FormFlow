import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/icon.js';
import { Button } from '@/components/ui/button.js';
import UserMenu from '@/components/userMenu.js';
import SideBarNavigation from '@/components/nav/sideBarNavigation.js';

const SideBar = () => {
  return (
    <aside className="w-1/5 h-screen flex flex-col justify-between overflow-y-auto border-r border-neutral-200 bg-white">
      <div>
        <div className="h-[74px] flex items-center p-5 border-b border-gray-200">
          <Link href="/dashboard">
            <Image src="/logo.svg" alt="Logo" width={154} height={62} priority />
          </Link>
        </div>
        <SideBarNavigation />
      </div>
      <div className="w-full p-3 border-t">
        <div className="w-full flex mb-3 justify-center">
          <Button className="inline-flex items-center border leading-4 font-medium rounded-md focus:outline-none h-[42px] sm:h-[38px] text-sm  text-neutral-500 bg-white hover:bg-neutral-50 focus:ring-0 focus:ring-offset-0 pr-4 hover:ring-2 hover:ring-yellow-500 hover:border-yellow-600 !shadow-sm !border-neutral-300 !w-full justify-center">
            <Icon name="Zap" className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="max-w-full overflow-hidden">Conect to Notion</span>
          </Button>
        </div>
        <UserMenu />
      </div>
    </aside>
  );
};

export default SideBar;
