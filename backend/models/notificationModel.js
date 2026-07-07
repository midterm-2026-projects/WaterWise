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

export const notificationModel = {
  findAll: () => {
    return [...temporaryDatabaseAlerts];
  },

  findById: (id) => {
    return temporaryDatabaseAlerts.find(item => item.id === id) || null;
  },

  updateReadStatus: (id, isRead) => {
    const alert = temporaryDatabaseAlerts.find(item => item.id === id);
    if (alert) {
      alert.is_read = isRead;
      return { ...alert };
    }
    return null;
  },

  __resetStorage: (newSeeds) => {
    temporaryDatabaseAlerts = [...newSeeds];
  }
};