import Link from 'next/link';
import Icon from '@/components/ui/icon';

/**
 * SettingsPage Component
 *
 * Este componente representa la página de configuración de la aplicación.
 * Retorna un div que contiene una barra de navegación con enlaces a las secciones de "Account" y "Security".
 *
 * @component
 */
const SettingsPage = () => {
  return (
    <div className="flex w-full overflow-x-auto overflow-y-hidden scrollbar-hide border-b border-neutral-200">
      <div className="block mx-4">
        <nav className="-mb-px flex space-x-6 ">
          <Link
            href="/settings?tab=account"
            className="border-blue-500 text-blue-600 hover:text-blue-400 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm"
          >
            <Icon name="User" className="-ml-0.5 mr-2 h-5 w-5" />
            <span className="whitespace-nowrap">Account</span>
          </Link>
          <Link
            href={`/settings?tab=security`}
            className="border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm"
          >
            <Icon name="ShieldCheck" className="-ml-0.5 mr-2 h-5 w-5" />
            <span className="whitespace-nowrap">Security</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SettingsPage;
