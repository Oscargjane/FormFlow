import SideBar from '@/components/side-bar.js';
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
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1">
        <Nav />
        <main className="flex w-full p-16 overflow-auto justify-center items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
