import { notificationModel } from '../models/notificationModel.js';

export const notificationService = {

  getUserNotifications: async (userId) => {
    const allAlerts = await notificationModel.findAll();
    const userRows = allAlerts.filter(item => item.profile_id === userId);
    
    const accountBills = userRows.filter(item => item.category === 'bill');
    const adminAnnouncements = userRows.filter(item => item.category === 'announcement');
    const unreadCount = userRows.filter(item => !item.is_read).length;

    return {
      unreadCount,
      streams: { accountBills, adminAnnouncements }
    };
  },

  markAsRead: async (notificationId, userId) => {
    const targetAlert = await notificationModel.findById(notificationId);

    if (!targetAlert) {
      return { errorType: 'NOT_FOUND', data: { error: 'Not Found' } };
    }

    if (targetAlert.profile_id !== userId) {
      return { 
        errorType: 'FORBIDDEN', 
        data: { 
          error: 'Forbidden', 
          message: 'Security Violation: Access denied to cross-account notification parameters.' 
        } 
      };
    }

    const updatedRecord = await notificationModel.updateReadStatus(notificationId, true);
    return { errorType: null, data: { modified: true, id: updatedRecord.id, is_read: updatedRecord.is_read } };
  }
};
