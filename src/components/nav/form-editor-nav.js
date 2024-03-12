'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/icon.js';
import Breadcrumb from '@/components/nav/breadcrumb.js';
import { Button } from '@/components/ui/button.js';
import { cn } from '@/lib/utils.js';
import SaveFormBtn from '@/components/save-form-btn.js';

// Elementos de navegación
const navItems = [
  {
    label: 'Edit',
    href: '/editor/[id]/edit',
  },
  {
    label: 'Share',
    href: '/editor/[id]/share',
  },
  {
    label: 'Submissions',
    href: '/editor/[id]/submissions',
  },
];

// Función para reemplazar el [id] en la ruta con el id del formulario
const replaceIdInHref = (href, id) => href.replace('[id]', id);

// Función para determinar si una ruta es la ruta activa
const isActiveRoute = (itemHref, currentPath, formId) =>
  currentPath.startsWith(replaceIdInHref(itemHref, formId));

/**
 * Componente de navegación del editor de formularios.
 * Este componente muestra una barra de navegación con enlaces a las páginas de edición, compartir y envíos.
 * También muestra botones para guardar y publicar el formulario.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.formId - El id del formulario que se está editando.
 * @returns {ReactElement} El elemento del componente de navegación del editor de formularios.
 */
const FormEditorNav = ({ formId }) => {
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <nav className="w-full flex items-center justify-between px-7 py-3 border-b border-neutral-200 bg-neutral-50">
      <Breadcrumb />
      <div className="flex items-center space-x-3">
        {navItems.map((item) => {
          return (
            <Link
              key={item.label}
              href={replaceIdInHref(item.href, formId)}
              className={cn(
                'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600 px-3 py-[7px] font-medium text-sm rounded-md',
                isActiveRoute(item.href, pathname, formId) &&
                  'bg-blue-100 text-blue-500 hover:text-blue-500 hover:bg-blue-100',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center space-x-4">
        <SaveFormBtn id={formId} />
        <Button className="px-4 py-0">
          <Icon name="ArrowUpToLine" className="w-4 h-4 mr-2" />
          <span>Publish</span>
        </Button>
      </div>
    </nav>
  );
};

export default FormEditorNav;
