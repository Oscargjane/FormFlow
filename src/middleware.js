import { NextResponse } from 'next/server';
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

const signInOrSignUpRoutes = ['/sign-in', '/sign-up'];

const isSignInOrSignUpRoute = (pathname) => signInOrSignUpRoutes.includes(pathname);

const redirectToDashboard = (req) => {
  const redirectUrl = new URL('/dashboard', req.url);
  redirectUrl.searchParams.set('from', req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
};

/**
 * Middleware de autenticación para Next.js utilizando Clerk.
 * Este middleware se aplica a todas las rutas de la aplicación.
 * Las rutas especificadas en `publicRoutes` no requerirán autenticación.
 * Todas las demás rutas requerirán que el usuario esté autenticado.
 */
export default authMiddleware({
  // La función `afterAuth` se ejecuta después de que el middleware de autenticación ha procesado la solicitud.
  afterAuth(auth, req) {
    const { userId, isPublicRoute } = auth;
    const { pathname } = req.nextUrl;

    if (!userId && !isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (userId && isSignInOrSignUpRoute(pathname)) {
      return redirectToDashboard(req);
    }

    if (userId || isPublicRoute) {
      return NextResponse.next();
    }

    return redirectToSignIn({ returnBackUrl: req.url });
  },

  publicRoutes: ['/'],
});

// `config` define cómo se aplica el middleware.
// `matcher` es una lista de patrones de ruta a los que se aplica el middleware.
// En este caso, se aplica a todas las rutas excepto las que terminan en una extensión de archivo (como `.png` o `.css`),
// y las rutas que comienzan con `_next` (que son rutas internas de Next.js).
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
