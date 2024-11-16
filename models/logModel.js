const pool = require('../config/db');

const Log = {
    // Create a new log entry
    async createLog(log) {
        try {
            const query = `
                INSERT INTO logs 
                (child_id, action_type, comments, user_id) 
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await pool.execute(query, [
                log.childId,
                log.actionType,
                log.comments,
                log.performedBy,
            ]);
            return result.insertId;
        } catch (err) {
            console.error('Error creating log:', err);
            throw new Error('Database insert error');
        }
    },

    // Retrieve logs for a specific child
    async getLogsByChildId(childId) {
        try {
            const query = `
                SELECT l.*, u.username AS performed_by_username 
                FROM logs l
                INNER JOIN users u ON l.user_id = u.id
                WHERE l.child_id = ?
            `;
            const [rows] = await pool.execute(query, [childId]);
            return rows;
        } catch (err) {
            console.error('Error fetching logs by child ID:', err);
            throw new Error('Database query error');
        }
    },

    // Retrieve all logs
    async getAllLogs() {
        try {
            const query = `
                SELECT l.*, u.username AS performed_by_username 
                FROM logs l
                INNER JOIN users u ON l.user_id = u.id
            `;
            const [rows] = await pool.execute(query);
            return rows;
        } catch (err) {
            console.error('Error fetching all logs:', err);
            throw new Error('Database query error');
        }
    },

    // Retrieve a specific log by ID
    async getLogById(logId) {
        try {
            const query = `
                SELECT l.*, u.username AS performed_by_username 
                FROM logs l
                INNER JOIN users u ON l.user_id = u.id
                WHERE l.id = ?
            `;
            const [rows] = await pool.execute(query, [logId]);
            return rows[0]; // Return the first matching log, if exists
        } catch (err) {
            console.error('Error fetching log by ID:', err);
            throw new Error('Database query error');
        }
    },

    // Update a specific log by ID
    async updateLog(logId, updatedData) {
        try {
            const query = `
                UPDATE logs 
                SET child_id = ?, action_type = ?, comments = ?, user_id = ? 
                WHERE id = ?
            `;
            const [result] = await pool.execute(query, [
                updatedData.childId || null,
                updatedData.actionType || null,
                updatedData.comments || null,
                updatedData.performedBy || null,
                logId,
            ]);
            return result.affectedRows; // Number of rows affected by the update
        } catch (err) {
            console.error('Error updating log:', err);
            throw new Error('Database update error');
        }
    },

    // Delete a specific log by ID
    async deleteLog(logId) {
        try {
            const query = 'DELETE FROM logs WHERE id = ?';
            const [result] = await pool.execute(query, [logId]);
            return result.affectedRows; // Number of rows affected by the delete
        } catch (err) {
            console.error('Error deleting log:', err);
            throw new Error('Database delete error');
        }
    },
};

module.exports = Log;

