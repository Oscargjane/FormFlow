'use server';

import prisma from '@/db/client.js';

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @param {Object} userData - Los datos del usuario a crear en la base de datos proporcionados por Clerk.
 * @returns {Promise<Object>} El usuario creado.
 * @throws {Error} Si los datos del usuario son inválidos o si ocurre un error al crear el usuario.
 */
export async function createUser(userData) {
  // Validación de datos del usuario
  if (
    !userData.id ||
    !userData.first_name ||
    !userData.last_name ||
    !userData.email_addresses ||
    !userData.email_addresses[0].email_address
  ) {
    throw new Error('Invalid user data.');
  }

  try {
    // Se crea un nuevo usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email_addresses[0].email_address,
      },
    });
    return user;
  } catch (error) {
    // Manejo de errores
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      throw new Error('There is already a user with that email address.');
    } else {
      console.error('Error creating user:', error);
      throw new Error('Internal server error.');
    }
  }
}

/**
 * Actualiza un usuario existente en la base de datos.
 *
 * @param {string} userId - El ID del usuario a actualizar.
 * @param {Object} userData - Los nuevos datos del usuario.
 * @returns {Promise<Object>} El usuario actualizado.
 * @throws {Error} Si el usuario no se encuentra o si ocurre un error al actualizar el usuario.
 */
export async function updateUser(userId, userData) {
  try {
    // Se actualiza el usuario en la base de datos
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email_addresses[0].email_address,
      },
    });

    return user;
  } catch (error) {
    // Manejo de errores
    console.error('Error updating user:', error);
    if (error.code === 'P2025') {
      throw new Error('User not found.');
    } else {
      throw new Error('Internal server error.');
    }
  }
}

/**
 * Elimina un usuario existente de la base de datos.
 *
 * @param {string} userId - El ID del usuario a eliminar.
 * @returns {Promise<Object>} El usuario eliminado.
 * @throws {Error} Si el usuario no se encuentra o si ocurre un error al eliminar el usuario.
 */
export async function deleteUser(userId) {
  try {
    // Se elimina el usuario de la base de datos
    const user = await prisma.user.delete({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    // Manejo de errores
    console.error('Error deleting user:', error);
    if (error.code === 'P2025') {
      throw new Error('User not found.');
    } else {
      throw new Error('Internal server error.');
    }
  }
}
