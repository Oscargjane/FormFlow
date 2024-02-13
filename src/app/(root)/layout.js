import { ClerkProvider } from '@clerk/nextjs';
import { inter } from '@/config/fontConfig.js';
import Nav from '@/components/nav/nav';
import SideBar from '@/components/side-bar';
import { cn } from '@/lib/utils.js';
import '@/app/globals.css';

/**
 * Componente de layout raíz.
 * Este componente envuelve todas las páginas y proporciona la navegación y la barra lateral.
 * También configura Clerk para la autenticación y la gestión de usuarios.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos que se van a renderizar dentro del layout.
 * @returns {ReactElement} El elemento del layout raíz.
 */
export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#171717',
          fontFamily: 'font-sans, sans-serif',
        },
      }}
    >
      <html lang="en">
        <body className={cn('font-sans', inter.variable)}>
          <div className="flex h-screen">
            <SideBar />
            <div className="flex-1">
              <Nav />
              <main className="flex m-16 ml-24 max-w-5xl p-4 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
