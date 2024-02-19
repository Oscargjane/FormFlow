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
  return (
    <nav className="h-[74px] flex justify-between items-center p-5 bg-white border-b border-neutral-200">
      <Breadcrumb />
      <CreateFormBtn />
    </nav>
  );
};

export default MainNav;
