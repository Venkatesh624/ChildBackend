const pool = require('../config/db');

const Agency = {
    async createAgency(agency) {
        const query = `
            INSERT INTO agencies 
            (agency_name, location, contact_info) 
            VALUES (?, ?, ?)`;
        const [result] = await pool.execute(query, [
            agency.agencyName,
            agency.location,
            agency.contactInfo, // Updated to match `contact_info`
        ]);
        return result.insertId;
    },

    async getAllAgencies() {
        const query = `SELECT * FROM agencies`;
        const [rows] = await pool.execute(query);
        return rows;
    },

    async getAgencyById(agencyId) {
        const query = `SELECT * FROM agencies WHERE id = ?`; // Updated `id` column
        const [rows] = await pool.execute(query, [agencyId]);
        return rows[0];
    },

    async updateAgency(agencyId, agencyData) {
        const query = `
            UPDATE agencies 
            SET agency_name = ?, location = ?, contact_info = ?
            WHERE id = ?`; // Updated `id` column
        await pool.execute(query, [
            agencyData.agencyName,
            agencyData.location,
            agencyData.contactInfo, // Updated to match `contact_info`
            agencyId,
        ]);
    },

    async deleteAgency(agencyId) {
        const query = `DELETE FROM agencies WHERE id = ?`; // Updated `id` column
        await pool.execute(query, [agencyId]);
    }
};

module.exports = Agency;

