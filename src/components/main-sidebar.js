import Icon from '@/components/ui/icon.js';
import { Button } from '@/components/ui/button.js';
import UserMenu from '@/components/user-menu.js';
import SideBarNav from '@/components/nav/sidebar-nav.js';

/**
 * MainSideBar Component
 *
 * Este componente representa la barra lateral principal de la aplicación.
 * Contiene el componente SideBarNav, que muestra la navegación de la barra lateral, y el componente UserMenu, que es un menú para el usuario.
 * También incluye un botón para conectar con Notion.
 *
 * @component
 * @example
 * return (
 *   <MainSideBar />
 * )
 */
const MainSideBar = () => {
  return (
    <aside className="min-w-[265px] h-full flex flex-col justify-between overflow-y-auto border-r border-neutral-200 bg-white">
      <SideBarNav />
      <div className="w-full p-3 border-t">
        <div className="w-full flex mb-3 justify-center">
          <Button className=" w-full h-10 border leading-4 font-medium text-sm rounded-md focus:outline-none text-neutral-500 bg-white hover:bg-neutral-50 focus:ring-0 focus:ring-offset-0 hover:ring-2 hover:ring-yellow-500 hover:border-yellow-600 ">
            <Icon name="Zap" className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="max-w-full overflow-hidden">Conect to Notion</span>
          </Button>
        </div>
        <UserMenu />
      </div>
    </aside>
  );
};

export default MainSideBar;
