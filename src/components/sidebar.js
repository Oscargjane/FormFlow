'use client';

import { usePathname } from 'next/navigation';
import MainSideBar from '@/components/main-sidebar.js';
import FormElementsSidebar from '@/components/form-elements-sidebar.js';

/**
 * Sidebar Component
 *
 * Este componente representa la barra lateral de la aplicación.
 * Dependiendo de la ruta actual, renderiza el componente MainSideBar o FormElementsSidebar.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 */
const Sidebar = () => {
  const pathname = usePathname(); // Se obtiene la ruta actual

  // Renderiza el componente FormElementsSidebar para las rutas que comienzan con '/editor/' y terminan con '/edit'
  if (pathname.startsWith('/editor/') && pathname.endsWith('/edit')) {
    return <FormElementsSidebar />;
  }
  // Renderiza el componente MainSideBar para las rutas '/dashboard' y '/settings'
  else if (pathname === '/dashboard' || pathname === '/settings') {
    return <MainSideBar />;
  }
  // En caso de que la ruta no coincida con ninguna de las anteriores, no renderizamos nada
  else {
    return null;
  }
};

export default Sidebar;
