import { NextResponse } from 'next/server';
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

/**
 * Middleware de autenticación para Next.js utilizando Clerk.
 * Este middleware se aplica a todas las rutas de la aplicación.
 * Las rutas especificadas en `publicRoutes` no requerirán autenticación.
 * Todas las demás rutas requerirán que el usuario esté autenticado.
 */
export default authMiddleware({
  // La función `afterAuth` se ejecuta después de que el middleware de autenticación ha procesado la solicitud.
  afterAuth(auth, req) {
    // Comprueba si la ruta actual es una de las rutas de inicio de sesión o registro.
    const isSignInOrSignUpRoute = ['/sign-in', '/sign-up'].includes(req.nextUrl.pathname);

    // Si el usuario no está autenticado y la ruta no es pública, redirige al usuario a la página de inicio de sesión
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Si el usuario está autenticado y está en una ruta de inicio de sesión o registro, redirige al usuario al dashboard
    if (auth.userId && isSignInOrSignUpRoute) {
      const redirectUrl = new URL('/dashboard', req.url);
      // Añade ?from=/ruta-entrante a la URL del dashboard
      redirectUrl.searchParams.set('from', req.nextUrl.pathname);
      // Y redirige a la nueva URL
      return NextResponse.redirect(redirectUrl);
    }

    // Si el usuario está autenticado o la ruta es pública, permite que la solicitud continúe
    if (auth.userId || auth.isPublicRoute) {
      return NextResponse.next();
    }

    // En otras situaciones (por ejemplo, un usuario autenticado intentando acceder a una ruta no pública),
    // redirige al usuario a la página de inicio de sesión
    return redirectToSignIn({ returnBackUrl: req.url });
  },
  publicRoutes: ['/', '/api/webhook/clerk'],
});

// `config` define cómo se aplica el middleware.
// `matcher` es una lista de patrones de ruta a los que se aplica el middleware.
// En este caso, se aplica a todas las rutas excepto las que terminan en una extensión de archivo (como `.png` o `.css`),
// y las rutas que comienzan con `_next` (que son rutas internas de Next.js).
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
