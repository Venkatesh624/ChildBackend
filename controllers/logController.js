const Log = require('../models/logModel');

const logController = {
    // Create a new log entry
    async createLog(req, res) {
        try {
            const newLog = req.body;
            const logId = await Log.createLog(newLog);
            res.status(201).json({ message: 'Log created successfully', logId });
        } catch (err) {
            console.error('Error creating log:', err);
            res.status(500).json({ error: 'Failed to create log', details: err.message });
        }
    },

    // Get logs by child ID
    async getLogsByChildId(req, res) {
        try {
            const childId = req.params.childId;
            const logs = await Log.getLogsByChildId(childId);
            res.status(200).json(logs);
        } catch (err) {
            console.error('Error fetching logs by child ID:', err);
            res.status(500).json({ error: 'Failed to fetch logs', details: err.message });
        }
    },

    // Get all logs
    async getAllLogs(req, res) {
        try {
            const logs = await Log.getAllLogs();
            res.status(200).json(logs);
        } catch (err) {
            console.error('Error fetching all logs:', err);
            res.status(500).json({ error: 'Failed to fetch logs', details: err.message });
        }
    },

    // Get a specific log by ID
    async getLogById(req, res) {
        try {
            const logId = req.params.id;
            const log = await Log.getLogById(logId);
            if (log) {
                res.status(200).json(log);
            } else {
                res.status(404).json({ error: 'Log not found' });
            }
        } catch (err) {
            console.error('Error fetching log by ID:', err);
            res.status(500).json({ error: 'Failed to fetch log', details: err.message });
        }
    },

    // Update a specific log by ID
    async updateLog(req, res) {
        try {
            const logId = req.params.id;
            const updatedData = req.body;
            const affectedRows = await Log.updateLog(logId, updatedData);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Log updated successfully' });
            } else {
                res.status(404).json({ error: 'Log not found or no changes made' });
            }
        } catch (err) {
            console.error('Error updating log:', err);
            res.status(500).json({ error: 'Failed to update log', details: err.message });
        }
    },

    // Delete a specific log by ID
    async deleteLog(req, res) {
        try {
            const logId = req.params.id;
            const affectedRows = await Log.deleteLog(logId);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Log deleted successfully' });
            } else {
                res.status(404).json({ error: 'Log not found' });
            }
        } catch (err) {
            console.error('Error deleting log:', err);
            res.status(500).json({ error: 'Failed to delete log', details: err.message });
        }
    },
};

module.exports = logController;
