const pool = require('../config/db');

const AssignedAgencies = {
    async createAssignment(data) {
        const query = `
            INSERT INTO assigned_agencies 
            (agency_id, child_id, status, remarks) 
            VALUES (?, ?, ?, ?)`;
        const [result] = await pool.execute(query, [
            data.agencyId,
            data.childId,
            data.status || 'Active', // Default to 'Active'
            data.remarks || null,   // Default to null if no remarks
        ]);
        return result.insertId;
    },

    async getAssignmentsByAgency(agencyId) {
        const query = `
            SELECT * 
            FROM assigned_agencies 
            WHERE agency_id = ?`;
        const [rows] = await pool.execute(query, [agencyId]);
        return rows;
    },

    async getAssignmentsByChild(childId) {
        const query = `
            SELECT * 
            FROM assigned_agencies 
            WHERE child_id = ?`;
        const [rows] = await pool.execute(query, [childId]);
        return rows;
    },

    async updateAssignedAgency(agencyId, childId, updateData) {
        const query = `
            UPDATE assigned_agencies 
            SET status = ?, remarks = ? 
            WHERE agency_id = ? AND child_id = ?`;
        await pool.execute(query, [
            updateData.status,
            updateData.remarks,
            agencyId,
            childId,
        ]);
    },

    async deleteAssignment(agencyId, childId) {
        const query = `
            DELETE FROM assigned_agencies 
            WHERE agency_id = ? AND child_id = ?`;
        await pool.execute(query, [agencyId, childId]);
    }
};

module.exports = AssignedAgencies;
