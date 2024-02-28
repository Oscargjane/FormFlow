import { inter } from '@/config/fontConfig.js';
import config from '@root/tailwind.config.js';
import { cn } from '@/lib/utils.js';
import { ClerkProvider } from '@clerk/nextjs';
import EditorContextProvider from '@/components/context/editor-context.js';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster.js';
import '@/app/globals.css';

const { colors } = config.theme.extend;

/**
 * Componente RootLayout.
 * Este componente actúa como el layout principal de la aplicación.
 * Envuelve todas las páginas de la aplicación y proporciona servicios y configuraciones comunes.
 *
 * Servicios y configuraciones proporcionados:
 * - Configuración de Clerk para la autenticación y la gestión de usuarios.
 * - Configuración del proveedor de contexto del editor para permitir el acceso al estado y las funciones del editor en los componentes hijos.
 * - Configuración de la barra de carga superior para indicar el progreso de la carga de la página.
 * - Configuración del componente Toaster para mostrar notificaciones en la aplicación.
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
          colorPrimary: colors.neutral['900'],
          fontFamily: 'font-sans, sans-serif',
        },
      }}
    >
      <html lang="en">
        <body className={cn('font-sans', inter.variable)}>
          <NextTopLoader color={colors.yellow['400']} />
          <EditorContextProvider>
            {children}
            <Toaster />
          </EditorContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
