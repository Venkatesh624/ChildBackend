const pool = require('../config/db');

const Notification = {
    async createNotification(notification) {
        const query = `
            INSERT INTO notifications 
            (message, read_status, user_id, child_id) 
            VALUES (?, ?, ?, ?)`;
        const [result] = await pool.execute(query, [
            notification.message,
            notification.readStatus || false,
            notification.userId,
            notification.childId,
        ]);
        return result.insertId;
    },

    async getNotificationsByUserId(userId) {
        const query = `SELECT * FROM notifications WHERE user_id = ?`;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },

    async markNotificationAsRead(notificationId) {
        const query = `UPDATE notifications SET read_status = TRUE WHERE id = ?`;
        await pool.execute(query, [notificationId]);
    }
};

module.exports = Notification;
