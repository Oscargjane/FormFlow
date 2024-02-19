'use client';

import { usePathname } from 'next/navigation';
import AuthNav from '@/components/nav/auth-nav.js';
import MainNav from '@/components/nav/main-nav.js';
import FormEditorNav from '@/components/nav/form-editor-nav.js';

/**
 * Componente de navegación principal.
 * Este componente decide qué componente de navegación renderizar en función de la ruta actual.
 *
 * @returns {ReactElement} El componente de navegación correspondiente a la ruta actual.
 */
const Nav = () => {
  const pathname = usePathname();
  const segments = pathname.split('/'); // Se obtiene la ruta actual

  // Renderiza el componente de navegación de autenticación para las rutas de inicio de sesión y registro
  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    return <AuthNav />;
  }
  // Renderiza el componente de navegación del editor de formularios para las rutas del editor
  else if (segments[1] === 'editor' && segments.length > 2) {
    const formId = segments[2];
    return <FormEditorNav formId={formId} />;
  }
  // Renderiza el componente de navegación principal para todas las demás rutas
  else {
    return <MainNav />;
  }
};

export default Nav;
