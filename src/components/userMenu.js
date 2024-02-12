'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.js';
import Icon from '@/components/ui/icon.js';

const UserMenu = () => {
  // Obtiene el usuario actual y la función de cierre de sesión de Clerk
  const { user, signOut } = useClerk();

  const router = useRouter(); // Se obtiene el router para redirigir al usuario

  // Función para obtener las iniciales del usuario
  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  // Función para manejar el clic en el boton de configuración
  const handleSettingsClick = () => {
    router.push('/settings');
  };

  // Función para manejar el clic en el botón de cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/sign-in');
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  };

  // Si no hay usuario, no se muestra nada
  if (!user) {
    return null;
  }

  // Clases reutilizables para los elementos del menú
  const menuItemClasses = 'flex items-center space-x-2 cursor-pointer';
  const iconClasses = 'w-3.5 h-3.5';

  return (
    <DropdownMenu className="w-full">
      <DropdownMenuContent className="min-w-64 rounded-md bg-white shadow-lg ring-1 ring-neutral-900 ring-opacity-5 focus:outline-none ">
        <DropdownMenuItem onSelect={handleSettingsClick} className={menuItemClasses}>
          <Icon name="Settings" className={iconClasses} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut} className={menuItemClasses}>
          <Icon name="LogOut" className={iconClasses} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DropdownMenuTrigger className="group w-full flex items-center space-x-2 rounded-md bg-neutral-100 mb-5 px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-600 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-100 border border-neutral-300">
        <span className="flex w-full items-center justify-between">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            <div className="rounded-full h-8 w-8 bg-blue-500 font-medium text-blue-50 flex items-center justify-center">
              {getInitials(user.firstName, user.lastName)}
            </div>
            <span className="truncate text-sm font-medium">{user.fullName}</span>
          </span>

          <Icon name="ChevronsUpDown" className="group w-4 h-4 text-neutral-400" />
        </span>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserMenu;
