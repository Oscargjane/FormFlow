'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

import { BrandIcon, GearIcon, DividerIcon } from '@/components/Icon';

const Navigation = () => {
  // Obtiene el usuario y el estado de la carga del usuario
  const { user, isLoaded, isError } = useUser();
  const pathname = usePathname(); // Se obtiene la ruta actual
  const router = useRouter(); // Se obtiene el router de Next.js

  // Formatea la ruta actual para que cada segmento comience con una letra mayúscula
  const formattedPathname = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  // Si el usuario no está autenticado, se redirige al usuario a la página de inicio de sesión
  useEffect(() => {
    !user && isLoaded ? router.push('/sign-in') : router.push('/dashboard');
  }, [user, isLoaded, router]);

  if (!isLoaded)
    // Maneja la carga del usuario
    // TO-DO: Add skeleton loader.
    return <div>Loading...</div>;

  // Maneja el error al cargar el usuario
  if (isError)
    // TO-DO: Add error page.
    return <div>There was an error loading your user.</div>;

  return (
    <>
      {user ? (
        // Si el usuario está cargado, se muestra la navegación del usuario
        <>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard">
              <BrandIcon className="text-neutral-500" />
            </Link>
            {formattedPathname[0] !== 'Dashboard' && (
              <>
                <DividerIcon />
                <span className="text-gray-400 text-sm ml-2">{formattedPathname}</span>
              </>
            )}
          </div>
          <Link href="/profile">
            <GearIcon />
          </Link>
        </>
      ) : (
        // Si el usuario no está cargado, se muestra el logo
        <Link href="/sign-in">
          <Image src="/logo.svg" alt="Logo" width={140} height={56} priority />
        </Link>
      )}
    </>
  );
};

export default Navigation;
