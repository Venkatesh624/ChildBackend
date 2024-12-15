const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

router.post('/', notificationController.createNotification); // Add a new notification
router.get('/user/:userId', notificationController.getNotificationsByUserId); // Get notifications for a user
router.put('/:id/read', notificationController.markNotificationAsRead); // Mark a notification as read

module.exports = router;
