import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '@/components/nav/navigation';
import '@/app/globals.css';

export default function RootLayout({ children }) {
  // Este componente envuelve a sus hijos con el componente ClerkProvider, que proporciona
  // el contexto de Clerk a todos los componentes hijos. También aplica algunos estilos globales.
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
        <body>
          <Navigation />
          <main className="container mx-auto">
            <div className="flex items-center justify-center min-h-screen">
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
