import { z } from 'zod';

/**
 * formSchema
 *
 * Este esquema de Zod valida los objetos de formulario para la creación de un nuevo formulario.
 * Un objeto de formulario válido debe tener una propiedad 'title' que es una cadena de al menos 4 caracteres.
 *
 * @typedef {Object} Form
 * @property {string} title - El título del formulario. Debe tener al menos 4 caracteres.
 */
export const formSchema = z.object({
  title: z.string().min(4),
});
