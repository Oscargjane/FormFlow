'use client';

import { createContext, useState } from 'react';

// Se crea un nuevo contexto para el editor de formularios
// Este contexto permitirá a los componentes hijos acceder y manipular el estado del editor
export const EditorContext = createContext(null);

/**
 * Proveedor de contexto para el editor de formularios.
 * Este componente mantiene el estado de los elementos del editor y el elemento seleccionado,
 * y proporciona funciones para manipular estos estados.
 * @param {Object} props Las propiedades del componente
 * @param {ReactNode} props.children Los componentes hijos que tendrán acceso al contexto
 */
export default function EditorContextProvider({ children }) {
  // Se inicializa el estado para los elementos del editor y el elemento seleccionado
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  /**
   * Agrega un nuevo elemento en una posición específica del array de elementos.
   * @param {number} index El índice en el que se debe insertar el nuevo elemento
   * @param {Object} element El elemento a insertar
   */
  const addElement = (index, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  /**
   * Elimina un elemento del array de elementos por su id.
   * @param {string|number} id El id del elemento a eliminar
   */
  const removeElement = (id) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  /**
   * Actualiza un elemento existente en el array de elementos por su id.
   * @param {string|number} id El id del elemento a actualizar
   * @param {Object} element El nuevo elemento
   */
  const updateElement = (id, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };
  // Se renderiza el proveedor de contexto, pasando el estado y las funciones como valor
  return (
    <EditorContext.Provider
      value={{
        elements, // Los elementos actuales del editor
        setElements, // Función para actualizar los elementos del editor
        addElement, // Función para agregar un elemento al editor
        removeElement, // Función para eliminar un elemento del editor

        selectedElement, // El elemento seleccionado actualmente en el editor
        setSelectedElement, // Función para seleccionar un elemento del editor

        updateElement, // Función para actualizar un elemento del editor
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
