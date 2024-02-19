import { inter } from '@/config/fontConfig.js';
import config from '@root/tailwind.config.js';
import { cn } from '@/lib/utils.js';
import { ClerkProvider } from '@clerk/nextjs';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster.js';
import '@/app/globals.css';

const { colors } = config.theme.extend;

/**
 * Componente de layout raíz.
 * Este componente envuelve todas las páginas de la aplicación.
 * También configura Clerk para la autenticación y la gestión de usuarios.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos que se van a renderizar dentro del layout.
 * @returns {ReactElement} El elemento del layout raíz.
 */
export default function RootLayout({ children }) {
  return (
    // Configuración del proveedor de Clerk
    <ClerkProvider
      appearance={{
        variables: {
          // Configuración del color primario y la fuente
          colorPrimary: colors.neutral['900'],
          fontFamily: 'font-sans, sans-serif',
        },
      }}
    >
      <html lang="en">
        <body className={cn('font-sans', inter.variable)}>
          <NextTopLoader color={colors.yellow['400']} />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
