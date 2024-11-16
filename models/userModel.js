const db = require('../config/db');

const createUser = async (user) => {
    const query = `INSERT INTO users (username, password, role, agency_id) VALUES (?, ?, ?, ?)`;
    const { username, password, role, agency_id } = user;

    const [result] = await db.execute(query, [username, password, role, agency_id ?? null]);
    return result.insertId;
};

const getAllUsers = async () => {
    const query = `SELECT * FROM users`;
    const [rows] = await db.execute(query);
    return rows;
};

const getUserById = async (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
};


const updateUser = async (id, userData) => {
    const query = `
        UPDATE users 
        SET username = ?, password = ?, role = ?, agency_id = ?
        WHERE id = ?
    `;
    const { username, password, role, agency_id } = userData;

    const [result] = await db.execute(query, [username, password, role, agency_id ?? null, id]);
    return result.affectedRows;
};


const deleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};



