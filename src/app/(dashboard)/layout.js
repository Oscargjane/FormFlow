'use client';

import SideBar from '@/components/sidebar.js';
import Nav from '@/components/nav/nav.js';
import { DndContext } from '@dnd-kit/core';

/**
 * Componente DashboardLayout.
 *
 * Este componente actúa como el layout principal del dashboard de la aplicación.
 * Envuelve el contenido principal del dashboard y proporciona componentes comunes como la barra lateral y la navegación.
 *
 * Componentes proporcionados:
 * - SideBar: La barra lateral que proporciona navegación y funcionalidad adicional.
 * - Nav: La barra de navegación en la parte superior de la página.
 *
 * Además, este componente envuelve su contenido en un DndContext. Esto permite que los componentes hijos utilicen la funcionalidad de arrastrar y soltar proporcionada por la biblioteca @dnd-kit/core.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos que se renderizarán en el contenido principal del dashboard.
 * @returns {ReactElement} El elemento del layout del dashboard.
 */
export default function DashboardLayout({ children }) {
  return (
    <DndContext>
      <div className="flex flex-col h-screen">
        <Nav />
        <div className="flex flex-row h-full">
          <SideBar />
          <main className="flex-1 h-full p-5 overflow-auto justify-center items-center">
            {children}
          </main>
        </div>
      </div>
    </DndContext>
  );
}
