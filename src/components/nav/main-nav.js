import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/nav/breadcrumb.js';
import CreateFormBtn from '@/components/create-form-btn.js';

/**
 * MainNav Component
 *
 * Este componente representa la barra de navegación principal de la aplicación.
 * Contiene el componente Breadcrumb, que muestra la ruta de navegación actual, y el componente CreateFormBtn, que es un botón para crear un nuevo formulario.
 *
 * @component
 * @example
 * return (
 *   <MainNav />
 * )
 */

const MainNav = () => {
  const navStyles =
    'min-h-[74px] flex justify-between items-center pr-5 bg-neutral-50 border-b border-neutral-200';
  const logoContainerStyles =
    'w-[265px] flex items-center justify-start h-full bg-white border-r border-gray-200 pl-5 mr-5';

  return (
    <nav className={navStyles}>
      <div className="w-1/3 h-full flex items-center">
        <div className={logoContainerStyles}>
          <Link href="/dashboard">
            <Image src="/logo.svg" alt="Logo" width={154} height={62} priority />
          </Link>
        </div>
        <Breadcrumb />
      </div>
      <CreateFormBtn />
    </nav>
  );
};

export default MainNav;
