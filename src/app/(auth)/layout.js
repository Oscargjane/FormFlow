import { ClerkProvider } from '@clerk/nextjs';
import Nav from '@/components/nav/nav.js';
import '@/app/globals.css';

export default function RootLayout({ children }) {
  // Este componente envuelve a sus hijos con el componente ClerkProvider, que proporciona
  // el contexto de Clerk a todos los componentes hijos. También aplica algunos estilos globales.
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
        <body>
          <Nav />
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
