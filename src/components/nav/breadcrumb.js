'use client';

import { usePathname } from 'next/navigation';
import { getFormById } from '@/lib/actions/form.actions.js';
import { useState, useEffect, useMemo } from 'react';
import Icon from '@/components/ui/icon.js';

const Breadcrumb = () => {
  const pathname = usePathname(); // Obtiene la ruta actual

  // Divide la ruta en segmentos y obtiene el ID del formulario
  const pathSegments = pathname.split('/');
  const formId = parseInt(pathSegments[2], 10);

  const [formTitle, setFormTitle] = useState(null);

  // Hook useEffect para buscar el título del formulario cuando cambia la ruta o el ID del formulario
  useEffect(() => {
    const fetchFormTitle = async () => {
      // Si esta en la ruta del editor y el ID del formulario es válido, busca el título del formulario
      if (pathname.startsWith('/editor/') && formId) {
        const form = await getFormById(formId);
        setFormTitle(form.title);
      } else {
        setFormTitle(null);
      }

      fetchFormTitle();
    };
    setFormTitle(null);
  }, [pathname, formId]);

  // Se usa el hook useMemo para formatear la ruta actual
  // Cada segmento de la ruta comienza con una letra mayúscula
  const formattedPathname = useMemo(() => {
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

    // Si la ruta es , usamos el título del formulario
    if (segments[0] === 'Editor' && formTitle) {
      return [formTitle];
    } else if (!formTitle) {
      return ['Loading...'];
    }

    // Si la ruta es '/dashboard', mostrar 'Home'
    if (segments.join('/') === 'Dashboard') {
      return ['Home'];
    }

    return segments;
  }, [pathname, formTitle]);

  // Estilos reutilizables
  const iconStyle = 'w-6 h-6 text-neutral-400';

  return (
    <div className="flex items-center">
      <Icon name="Folder" className={iconStyle} />
      <div className="inline-block text-neutral-600 font-medium ml-2">
        {formattedPathname}
      </div>
    </div>
  );
};

export default Breadcrumb;