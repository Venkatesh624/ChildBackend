const Agency = require('../models/agencyModel');

const agencyController = {
    async createAgency(req, res) {
        try {
            const newAgency = req.body;
            const agencyId = await Agency.createAgency(newAgency);
            res.status(201).json({ message: 'Agency created successfully', agencyId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create agency' });
        }
    },

    async getAllAgencies(req, res) {
        try {
            const agencies = await Agency.getAllAgencies();
            res.status(200).json(agencies);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch agencies' });
        }
    },

    async getAgencyById(req, res) {
        try {
            const agencyId = req.params.id;
            const agency = await Agency.getAgencyById(agencyId);
            if (agency) {
                res.status(200).json(agency);
            } else {
                res.status(404).json({ error: 'Agency not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch agency' });
        }
    },

    async updateAgency(req, res) {
        try {
            const agencyId = req.params.id;
            const updatedData = req.body;
            await Agency.updateAgency(agencyId, updatedData);
            res.status(200).json({ message: 'Agency updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update agency' });
        }
    },

    async deleteAgency(req, res) {
        try {
            const agencyId = req.params.id;
            await Agency.deleteAgency(agencyId);
            res.status(200).json({ message: 'Agency deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete agency' });
        }
    }
};

module.exports = agencyController;
