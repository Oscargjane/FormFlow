// Importa la función clsx, que se utiliza para combinar nombres de clases en React
import { clsx } from 'clsx';

// Importa la función twMerge, que se utiliza para combinar clases de Tailwind CSS
import { twMerge } from 'tailwind-merge';

/**
 * Función de utilidad para combinar y fusionar nombres de clases.
 *
 * @param {...any} inputs - Los nombres de las clases a combinar y fusionar.
 * @returns {string} - Una cadena que contiene los nombres de las clases combinados y fusionados.
 **/

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function idGenerator() {
  return Math.floor(Math.random() * 10001).toString();
}
