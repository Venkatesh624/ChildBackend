const Child = require('../models/childModel');

const childController = {
    async createChild(req, res) {
        try {
            const newChild = req.body;
            const childId = await Child.createChild(newChild);
            res.status(201).json({ message: 'Child created successfully', childId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create child' });
        }
    },

    async getAllChildren(req, res) {
        try {
            const children = await Child.getChildren();
            res.status(200).json(children);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch children' });
        }
    },

    async getChildById(req, res) {
        try {
            const childId = req.params.id;
            const child = await Child.getChildById(childId);
            if (child) {
                res.status(200).json(child);
            } else {
                res.status(404).json({ error: 'Child not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch child' });
        }
    },

    async updateChild(req, res) {
        try {
            const childId = req.params.id;
            const updatedData = req.body;
            await Child.updateChild(childId, updatedData);
            res.status(200).json({ message: 'Child updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update child' });
        }
    },

    async deleteChild(req, res) {
        try {
            const childId = req.params.id;
            await Child.deleteChild(childId);
            res.status(200).json({ message: 'Child deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete child' });
        }
    }
};

module.exports = childController;

