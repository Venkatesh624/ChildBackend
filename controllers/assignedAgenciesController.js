const AssignedAgencies = require('../models/assignedAgencies');

const assignedAgenciesController = {
    async create(req, res) {
        try {
            const assignmentId = await AssignedAgencies.createAssignment(req.body);
            res.status(201).json({ message: 'Assignment created', assignmentId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getByAgency(req, res) {
        try {
            const agencyId = req.params.agencyId;
            const assignments = await AssignedAgencies.getAssignmentsByAgency(agencyId);
            res.status(200).json(assignments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getByChild(req, res) {
        try {
            const childId = req.params.childId;
            const assignments = await AssignedAgencies.getAssignmentsByChild(childId);
            res.status(200).json(assignments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAssignmentsWithAgencyDetails(req, res) {
        try {
            const agencyId = req.params.agencyId;
            const assignments = await AssignedAgencies.getAssignmentsByAgency(agencyId);
            res.status(200).json({
                message: 'Assignments retrieved with agency details',
                data: assignments,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { agencyId, childId } = req.params;
            const updateData = req.body;
            await AssignedAgencies.updateAssignedAgency(agencyId, childId, updateData);
            res.status(200).json({ message: 'Assignment updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const { agencyId, childId } = req.params;
            await AssignedAgencies.deleteAssignment(agencyId, childId);
            res.status(200).json({ message: 'Assignment deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = assignedAgenciesController;
