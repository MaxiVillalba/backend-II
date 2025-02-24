import * as userDao from '../daos/user.dao.js';

// Obtener todos los usuarios
export const getAllUsers = async () => {
    return await userDao.getAllUsers();
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
    const user = await userDao.getUserById(id);
    if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return user;
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
    // Aquí podrías agregar validaciones o lógica adicional
    if (!userData.email || !userData.password) {
        throw new Error('El email y la contraseña son obligatorios');
    }
    return await userDao.createUser(userData);
};

// Actualizar un usuario existente
export const updateUser = async (id, userData) => {
    const user = await userDao.updateUser(id, userData);
    if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return user;
};

// Eliminar un usuario
export const deleteUser = async (id) => {
    const user = await userDao.deleteUser(id);
    if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return user;
};
