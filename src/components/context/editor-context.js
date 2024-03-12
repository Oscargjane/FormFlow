'use client';

import { createContext, useState, useCallback } from 'react';

// Creación de un nuevo contexto para el editor de formularios
// Este contexto permitirá a los componentes hijos acceder y manipular el estado del editor
export const EditorContext = createContext(null);

/**
 * Proveedor de contexto para el editor de formularios.
 * Este componente mantiene el estado de los elementos del editor y el elemento seleccionado.
 * Proporciona funciones para manipular estos estados.
 * @param {Object} props Las propiedades del componente
 * @param {ReactNode} props.children Los componentes hijos que tendrán acceso al contexto
 */
export default function EditorContextProvider({ children }) {
  // Inicialización del estado para los elementos del editor y el elemento seleccionado
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Función para agregar un elemento en un índice específico
  const addElement = useCallback((index, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  }, []);

  // Función para eliminar un elemento por su id
  const removeElement = useCallback((id) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  }, []);

  // Función para actualizar un elemento por su id
  const updateElement = useCallback((id, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  }, []);

  // Renderizado del proveedor de contexto, pasando el estado y las funciones como valor
  return (
    <EditorContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
