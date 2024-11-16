const pool = require('../config/db');

const Notification = {
    async createNotification(notification) {
        const query = `
            INSERT INTO notifications 
            (user_id, child_id, message) 
            VALUES (?, ?, ?)`;
        const [result] = await pool.execute(query, [
            notification.userId,
            notification.childId,
            notification.message,
        ]);
        return result.insertId;
    },

    async getNotificationsByUserId(userId) {
        const query = `SELECT * FROM Notifications WHERE UserID = ?`;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },

    async markNotificationAsRead(notificationId) {
        const query = `UPDATE Notifications SET ReadStatus = TRUE WHERE NotificationID = ?`;
        await pool.execute(query, [notificationId]);
    }
};

module.exports = Notification;
