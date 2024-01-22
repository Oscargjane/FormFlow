import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import SideBar from '@/components/SideBar';
import { cn } from '@/app/lib/utils';
import '@/app/globals.css';

// Configura la fuente Inter con los subsets, pesos y variables deseados
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

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
          // *: tailwind css color theme not found
          // TO-DO: replace with css variable color
          // Se definen algunas variables de apariencia para los componentes de Clerk.
          // Actualmente, estas variables están hardcodeadas, pero el comentario sugiere
          // que deberia reemplazarlas con variables CSS en el futuro.
          colorPrimary: '#171717',
          fontFamily: 'font-sans, sans-serif',
        },
      }}
    >
      <html lang="en">
        <body
          className={cn(
            'min-h-screen grid grid-rows-dashboard grid-cols-dashboard gap-4 font-sans',
            inter.variable,
          )}
        >
          <aside className="row-span-3 col-span-1 bg-white p-4">
            <SideBar />
          </aside>
          <nav className="row-span-1 col-span-1 flex justify-between items-center p-5">
            <Navigation />
          </nav>
          <main className="row-span-2 col-span-1 p-4 overflow-auto">
            <div className="flex items-start justify-center">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
