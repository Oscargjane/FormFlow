'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getFormById } from '@/lib/actions/form.actions.js';
import { useState, useEffect, useMemo } from 'react';
import Icon from '@/components/ui/icon.js';
import { cn } from '@/lib/utils.js';

/**
 * Breadcrumb Component
 *
 * Este componente muestra una ruta de navegación (breadcrumb) basada en la ruta actual de la aplicación.
 * Si la ruta comienza con '/editor/', muestra un enlace a '/dashboard' y el título del formulario actual.
 * Si la ruta no comienza con '/editor/', muestra un icono de carpeta y la ruta actual formateada.
 *
 * @component
 * @example
 * return (
 *   <Breadcrumb />
 * )
 */
const Breadcrumb = () => {
  const pathname = usePathname(); // Obtiene la ruta actual

  // Divide la ruta en segmentos y obtiene el ID del formulario
  const pathSegments = pathname.split('/');
  const formId = parseInt(pathSegments[2], 10);

  // Estado para almacenar el título del formulario
  const [formTitle, setFormTitle] = useState(undefined);

  // Hook useEffect para buscar el título del formulario cuando cambia el ID del formulario
  useEffect(() => {
    const fetchFormTitle = async () => {
      // Si esta en la ruta del editor y el ID del formulario es válido, busca el título del formulario
      if (pathname.startsWith('/editor/') && formId) {
        const form = await getFormById(formId);
        setFormTitle(form.title);
      } else {
        setFormTitle(null);
      }
    };
    fetchFormTitle();
  }, [formId]);

  // Se usa el hook useMemo para formatear la ruta actual
  // Cada segmento de la ruta comienza con una letra mayúscula
  const formattedPathname = useMemo(() => {
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

    // Si la ruta es '/dashboard', mostrar 'Home'
    if (segments.join('/') === 'Dashboard') {
      return ['Home'];
    }

    return segments;
  }, [pathname, formTitle]);

  const pathnameStyles = 'inline-block text-neutral-600 font-medium';

  return (
    <div className="flex items-center w-1/6">
      {pathname.startsWith('/editor/') ? (
        <>
          <Link href="/dashboard">
            <Icon name="Home" className="w-[18px] h-[18px] mr-6 text-neutral-600" />
          </Link>
          {formTitle === undefined ? (
            <div className="flex-grow" />
          ) : (
            <div className={cn(pathnameStyles, 'flex-grow text-sm text-neutral-300')}>
              {formTitle}
            </div>
          )}
        </>
      ) : (
        <>
          <Icon name="Folder" className="w-6 h-6 mr-2 text-neutral-400" />
          <div className={pathnameStyles}>{formattedPathname}</div>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
