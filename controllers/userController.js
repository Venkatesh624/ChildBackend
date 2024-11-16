const User = require('../models/userModel');

const userController = {
    async createUser(req, res) {
        try {
            const { username, password, role, agency_id } = req.body;
            if (!username || !password || !role) {
                return res.status(400).json({ error: 'Username, password, and role are required' });
            }
            const agencyIdToInsert = agency_id ?? null;
            const newUser = { username, password, role, agency_id: agencyIdToInsert };
            console.log('Creating user with data:', newUser);
            const userId = await User.createUser(newUser);
            res.status(201).json({ message: 'User created successfully', userId });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Failed to create user', details: err.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Failed to fetch users', details: err.message });
        }
    },

    async getUserById(req, res) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const user = await User.getUserById(userId);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            console.error('Error fetching user by ID:', err);
            res.status(500).json({ error: 'Failed to fetch user', details: err.message });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const updatedData = req.body;
            updatedData.agency_id = updatedData.agency_id ?? null;

            await User.updateUser(userId, updatedData);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Failed to update user', details: err.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            await User.deleteUser(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Failed to delete user', details: err.message });
        }
    }
};

module.exports = userController;


