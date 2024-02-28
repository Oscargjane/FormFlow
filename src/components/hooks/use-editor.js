'use client';

import { useContext } from 'react';
import { EditorContext } from '@/components/context/editor-context.js';

/**
 * useEditor es un hook personalizado que consume el EditorContext.
 * Este hook se utiliza para acceder al estado y las funciones del editor en cualquier componente.
 *
 * @returns {Object} El objeto editor del contexto.
 * @throws {Error} Si se intenta utilizar este hook fuera de un EditorContext.
 */
export const useEditor = () => {
  // Se utiliza el hook useContext para acceder al EditorContext
  const context = useContext(EditorContext);

  // Si el editor no está definido, significa que este hook se está utilizando fuera de un EditorContext
  // En ese caso, se lanza un error
  if (!context) {
    throw new Error('useEditor must be used within a EditorContext');
  }

  return context;
};
