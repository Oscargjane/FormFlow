'use client';

import { usePathname } from 'next/navigation';
import AuthNavigation from '@/components/nav/authNavigation.js';
import MainNavigation from '@/components/nav/mainNavigation.js';

const Navigation = () => {
  const pathname = usePathname(); // Se obtiene la ruta actual

  return pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up') ? (
    <AuthNavigation />
  ) : (
    <MainNavigation />
  );
};

export default Navigation;
