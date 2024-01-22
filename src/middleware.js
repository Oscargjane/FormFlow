import { authMiddleware } from '@clerk/nextjs';

// Este middleware se aplica a todas las rutas de tu aplicación.
// Las rutas especificadas en `publicRoutes` no requerirán autenticación.
// Todas las demás rutas requerirán que el usuario esté autenticado.
export default authMiddleware({
  publicRoutes: ['/'],
});

// `config` define cómo se aplica el middleware.
// `matcher` es una lista de patrones de ruta a los que se aplica el middleware.
// En este caso, se aplica a todas las rutas excepto las que terminan en una extensión de archivo (como `.png` o `.css`),
// y las rutas que comienzan con `_next` (que son rutas internas de Next.js).
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
