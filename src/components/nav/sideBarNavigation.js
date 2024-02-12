'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/icon.js';
import { Button } from '@/components/ui/button.js';

const SideBarNavigation = () => {
  const pathname = usePathname();

  return pathname === '/dashboard' ? (
    <nav className="flex flex-col px-3 space-y-1 text-sm pt-5">
      <div className="flex justify-between items-center mb-2">
        <div className="flex text-gray-400 font-semibold ml-1 justify-start items-center">
          Workspaces
        </div>
        <Button
          variant="outline"
          size="icon"
          className="w-7 h-7 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded border-none"
        >
          <Icon name="Plus" className="w-5 h-5" />
        </Button>
      </div>
      <Link
        href="/dashboard"
        className="bg-neutral-50 text-neutral-600 group flex rounded-md text-sm leading-6 font-semibold gap-x-3 p-2"
      >
        <span className="text-neutral-600 border-neutral-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
          H
        </span>
        <span>Home</span>
      </Link>
    </nav>
  ) : (
    <nav className="px-3 space-y-1 flex-grow overflow-y-auto mt-3">
      <Link
        href="/dashboard"
        className="text-neutral-500 hover:text-neutral-800 text-lg font-medium flex items-center bg-neutral-50 border border-neutral-200 rounded p-3 hover:bg-neutral-200 group"
      >
        <Icon name="ChevronLeft" className="h-7 w-7" />
        <span className="ml-2">Back to Dashboard</span>
      </Link>
    </nav>
  );
};
export default SideBarNavigation;
