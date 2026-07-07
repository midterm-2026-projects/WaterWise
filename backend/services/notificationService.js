let temporaryDatabaseAlerts = [
  {
    id: 'valid-alert-101',
    profile_id: 'owner-uuid-101',
    category: 'bill',
    title: 'June Bill Overdue',
    message: 'Your current volumetric balance due is ₱1,450.75.',
    is_read: false
  },
  {
    id: 'alert-id-purok-1',
    profile_id: 'original-owner-purok-1', 
    category: 'announcement',
    title: 'Main Pipeline Maintenance',
    message: 'Temporary water service interruption.',
    is_read: false
  }
];

export const notificationService = {
  /**
   * Retrieves account-specific alert streams mapped cleanly by category
   */
  getUserNotifications: (userId) => {
    const userRows = temporaryDatabaseAlerts.filter(item => item.profile_id === userId);
    
    const accountBills = userRows.filter(item => item.category === 'bill');
    const adminAnnouncements = userRows.filter(item => item.category === 'announcement');
    const unreadCount = userRows.filter(item => !item.is_read).length;

    return {
      unreadCount,
      streams: { accountBills, adminAnnouncements }
    };
  },

  /**
   * Evaluates security permissions and marks a specific target notification as read
   */
  markAsRead: (notificationId, userId) => {
    const targetAlert = temporaryDatabaseAlerts.find(item => item.id === notificationId);

    if (!targetAlert) {
      return { status: 404, data: { error: 'Not Found' } };
    }

    if (targetAlert.profile_id !== userId) {
      return { 
        status: 403, 
        data: { 
          error: 'Forbidden', 
          message: 'Security Violation: Access denied to cross-account notification parameters.' 
        } 
      };
    }

    // Mutate the flag status directly in memory
    targetAlert.is_read = true;

    return { status: 200, data: { modified: true, id: notificationId, is_read: true } };
  }
};