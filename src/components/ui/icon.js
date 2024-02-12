import { icons } from 'lucide-react';

/**
 * Componente Icon
 * Este componente recibe un nombre de ícono y cualquier otra prop que se quiera pasar al ícono.
 * Renderiza el ícono correspondiente al nombre proporcionado.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.name - El nombre del ícono a renderizar.
 * @param {Object} props.rest - Cualquier otra prop que se quiera pasar al ícono.
 *
 * @returns {React.Element} El ícono renderizado.
 *
 * @throws {Error} Si el nombre del ícono proporcionado no existe en la biblioteca de íconos.
 */
const Icon = ({ name, ...props }) => {
  // Busca el ícono correspondiente al nombre proporcionado en la biblioteca de íconos
  const LucideIcon = icons[name];

  // Si el ícono no existe, lanza un error
  if (!LucideIcon) {
    throw new Error(`Icon "${name}" does not exist`);
  }

  return <LucideIcon {...props} />;
};

export default Icon;
