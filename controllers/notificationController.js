const Notification = require('../models/notificationModel');

const notificationController = {
    async createNotification(req, res) {
        try {
            const newNotification = req.body;
            const notificationId = await Notification.createNotification(newNotification);
            res.status(201).json({ message: 'Notification created successfully', notificationId });
        } catch (err) {
            console.error("Error in creating notification:", err);
            res.status(500).json({ error: 'Failed to create notification' });
        }
    },

    async getNotificationsByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const notifications = await Notification.getNotificationsByUserId(userId);
            res.status(200).json(notifications);
        } catch (err) {
            console.error("Error in fetching notifications:", err);
            res.status(500).json({ error: 'Failed to fetch notifications' });
        }
    },

    async markNotificationAsRead(req, res) {
        try {
            const notificationId = req.params.id;
            await Notification.markNotificationAsRead(notificationId);
            res.status(200).json({ message: 'Notification marked as read' });
        } catch (err) {
            console.error("Error in marking notification as read:", err);
            res.status(500).json({ error: 'Failed to mark notification as read' });
        }
    }
};

module.exports = notificationController;
