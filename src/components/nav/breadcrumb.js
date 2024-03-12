'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getFormById } from '@/lib/actions/form.actions.js';
import { useState, useEffect, useMemo } from 'react';
import Icon from '@/components/ui/icon.js';
import { cn } from '@/lib/utils.js';

/**
 * Hook personalizado para buscar el título del formulario.
 *
 * @param {number} formId - El ID del formulario.
 * @param {string} pathname - La ruta actual.
 * @returns {string} El título del formulario o un mensaje de error.
 */
const useFormTitle = (formId, pathname) => {
  const [formTitle, setFormTitle] = useState(undefined);

  useEffect(() => {
    /**
     * Función para buscar el título del formulario.
     * Si la ruta actual comienza con '/editor/' y el formId es válido,
     * busca el título del formulario. Si no, establece el título del formulario en null.
     */
    const fetchFormTitle = async () => {
      if (pathname.startsWith('/editor/') && formId) {
        try {
          const form = await getFormById(formId);
          setFormTitle(form?.title || 'Sin título');
        } catch (error) {
          console.error(error);
          setFormTitle('Error al buscar el título del formulario');
        }
      } else {
        setFormTitle(null);
      }
    };
    fetchFormTitle();
  }, [formId, pathname]);

  return formTitle;
};

/**
 * Componente Breadcrumb.
 * Muestra una ruta de navegación basada en la ruta actual.
 * Si la ruta comienza con '/editor/', muestra un enlace a la página de inicio y el título del formulario.
 * Si no, muestra un icono de carpeta y la ruta formateada.
 */
const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const formId = parseInt(pathSegments[2], 10);
  const formTitle = useFormTitle(formId, pathname);

  // Se usa el hook useMemo para formatear la ruta actual
  // Cada segmento de la ruta comienza con una letra mayúscula
  const formattedPathname = useMemo(() => {
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

    if (segments.join('/') === 'Dashboard') {
      return ['Home'];
    }

    return segments;
  }, [pathname]);

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
