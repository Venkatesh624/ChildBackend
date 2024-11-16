const db = require('../config/db'); 

// Create a new child entry
const createChild = async (childData) => {
    try {
        const validChildData = {
            name: childData.name || null,
            dob: childData.dob || null,
            description: childData.description || null,
            last_seen_info: childData.last_seen_info || null,
            reported_by: childData.reported_by || null
        };

        const query = `
            INSERT INTO children (name, dob, description, last_seen_info, reported_by) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            validChildData.name,
            validChildData.dob,
            validChildData.description,
            validChildData.last_seen_info,
            validChildData.reported_by
        ]);

        return result.insertId;
    } catch (err) {
        console.error('Error inserting child into DB:', err);
        throw new Error('Database insert error');
    }
};

// Retrieve all child records
const getChildren = async () => {
    try {
        const query = 'SELECT * FROM children';
        const [rows] = await db.execute(query);
        return rows;
    } catch (err) {
        console.error('Error fetching children from DB:', err);
        throw new Error('Database query error');
    }
};

// Retrieve a single child by ID
const getChildById = async (id) => {
    try {
        const query = 'SELECT * FROM children WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0]; // Return the first matching record, if exists
    } catch (err) {
        console.error('Error fetching child by ID:', err);
        throw new Error('Database query error');
    }
};

// Update a child record by ID
const updateChild = async (id, childData) => {
    try {
        const query = `
            UPDATE children 
            SET name = ?, dob = ?, description = ?, last_seen_info = ?, reported_by = ? 
            WHERE id = ?
        `;
        const { name, dob, description, last_seen_info, reported_by } = childData;
        const [result] = await db.execute(query, [
            name || null,
            dob || null,
            description || null,
            last_seen_info || null,
            reported_by || null,
            id
        ]);

        return result.affectedRows; // Number of rows affected by the update
    } catch (err) {
        console.error('Error updating child in DB:', err);
        throw new Error('Database update error');
    }
};

// Delete a child record by ID
const deleteChild = async (id) => {
    try {
        const query = 'DELETE FROM children WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows; // Number of rows affected by the delete
    } catch (err) {
        console.error('Error deleting child from DB:', err);
        throw new Error('Database delete error');
    }
};

module.exports = {
    createChild,
    getChildren,
    getChildById,
    updateChild,
    deleteChild
};

