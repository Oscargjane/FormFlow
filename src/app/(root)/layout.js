import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Navigation from '@/components/nav/navigation';
import SideBar from '@/components/sideBar';
import { cn } from '@/lib/utils.js';
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
        <body className={cn('font-sans', inter.variable)}>
          <div className="flex h-screen">
            <SideBar />
            <div className="flex-1">
              <Navigation />
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