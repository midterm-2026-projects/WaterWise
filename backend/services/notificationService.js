import { notificationModel } from '../models/notificationModel.js';

export const notificationService = {

  getUserNotifications: async (userId) => {
    const userRows = await notificationModel.findAll(userId);
    
    const accountBills = userRows.filter(item => item.category === 'bill');
    const adminAnnouncements = userRows.filter(item => item.category === 'announcement');
    const unreadCount = userRows.filter(item => !item.is_read).length;

    return {
      unreadCount,
      streams: { accountBills, adminAnnouncements }
    };
  },

  markAsRead: async (notificationId, userId) => {
    const targetAlert = await notificationModel.findById(notificationId, userId);

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

    const updatedRecord = await notificationModel.updateReadStatus(notificationId, true, userId);
    return { errorType: null, data: { modified: true, id: updatedRecord.id, is_read: updatedRecord.is_read } };
  },

  deleteForUser: async (notificationId, userId) => {
    const targetAlert = await notificationModel.findById(notificationId, userId);

    if (!targetAlert) {
      return { errorType: 'NOT_FOUND', data: { error: 'Not Found' } };
    }

    if (targetAlert.profile_id !== userId) {
      return { errorType: 'FORBIDDEN', data: { error: 'Forbidden' } };
    }

    await notificationModel.dismiss(notificationId, userId);
    return { errorType: null, data: { deleted: true, id: targetAlert.id } };
  }
};
