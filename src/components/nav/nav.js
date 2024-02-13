'use client';

import { usePathname } from 'next/navigation';
import AuthNav from '@/components/nav/auth-nav.js';
import MainNav from '@/components/nav/main-nav.js';
import FormEditorNav from '@/components/nav/form-editor-nav.js';

const Nav = () => {
  const pathname = usePathname();
  const segments = pathname.split('/'); // Se obtiene la ruta actual

  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    return <AuthNav />;
  } else if (segments[1] === 'editor' && segments.length > 2) {
    const formId = segments[2];
    return <FormEditorNav formId={formId} />;
  } else {
    return <MainNav />;
  }
};

export default Nav;
