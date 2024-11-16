const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser); // Add a new user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.put('/:id', userController.updateUser); // Update user details
router.delete('/:id', userController.deleteUser); // Delete user

module.exports = router;

