const pool = require('../config/db');

const AssignedAgencies = {
    async createAssignment(data) {
        const query = `
            INSERT INTO assigned_agencies 
            (agency_id, child_id, status) 
            VALUES (?, ?, ?)`;
        const [result] = await pool.execute(query, [
            data.agencyId,
            data.childId,
            data.status || 'Active', // Default to 'Active'
        ]);
        return result.insertId;
    },

    async getAssignmentsByAgency(agencyId) {
        const query = `
            SELECT 
                aa.id AS assignment_id,
                aa.child_id,
                aa.assigned_date,
                aa.status,
                a.agency_name,
                a.location,
                a.contact_info
            FROM 
                assigned_agencies AS aa
            JOIN 
                agencies AS a 
            ON 
                aa.agency_id = a.id
            WHERE 
                aa.agency_id = ?`;
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
            SET status = ? 
            WHERE agency_id = ? AND child_id = ?`;
        await pool.execute(query, [
            updateData.status,
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
