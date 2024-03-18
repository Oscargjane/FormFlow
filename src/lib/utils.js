import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

/**
 * Combina y fusiona nombres de clases.
 *
 * @param {...any} inputs - Los nombres de las clases a combinar y fusionar.
 * @returns {string} - Una cadena que contiene los nombres de las clases combinados y fusionados.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Genera un ID único.
 *
 * @returns {string} - Un ID único.
 */
export function idGenerator() {
  return uuidv4();
}

/**
 * Trunca un título a una longitud específica y añade puntos suspensivos si el título es más largo que la longitud especificada.
 * Si el título truncado termina en un punto, se elimina el punto.
 *
 * @param {string} title - El título a truncar.
 * @param {number} [length=20] - La longitud máxima del título truncado. Por defecto es 20.
 * @returns {string} - El título truncado.
 */
export function truncateTitle(title, length = 20) {
  let truncatedTitle = title.length > length ? title.substring(0, length) + '...' : title;
  if (truncatedTitle.endsWith('.')) {
    truncatedTitle = truncatedTitle.slice(0, -1);
  }
  return truncatedTitle;
}
