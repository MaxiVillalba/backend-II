import * as userDao from '../daos/user.dao.js';

export const getAllUsers = async (req, res) => { 
    try {
        const users = await userDao.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ status: "error", message: "An error occurred", error: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userDao.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await userDao.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userDao.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await userDao.deleteUser(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};