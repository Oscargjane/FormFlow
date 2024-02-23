import SideBar from '@/components/sidebar.js';
import Nav from '@/components/nav/nav.js';

/**
 * DashboardLayout Component
 *
 * Este componente representa el layout principal del dashboard.
 * Contiene la barra lateral (SideBar), la navegación (Nav) y el contenido principal.
 *
 * @component
 * @param {ReactNode} children - Los elementos hijos que se renderizarán en el contenido principal.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex flex-row h-full">
        <SideBar />
        <main className="flex-1 p-16 overflow-auto justify-center items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
