import { describe, it, expect, beforeEach } from 'vitest';
import { notificationService } from '../services/notificationService.js';
import { notificationModel } from '../models/notificationModel.js';

describe('notificationService', () => {

  beforeEach(() => {
    notificationModel.__resetStorage([
      {
        id: 'unit-alert-bill',
        profile_id: 'user-alpha',
        category: 'bill',
        title: 'Water Bill Issued',
        is_read: false
      },
      {
        id: 'unit-alert-announce',
        profile_id: 'user-alpha',
        category: 'announcement',
        title: 'Chlorine Flushing Schedule',
        is_read: false
      },
      {
        id: 'unit-alert-foreign',
        profile_id: 'user-beta', 
        category: 'bill',
        title: 'Overdue Penalties',
        is_read: false
      }
    ]);
  });

  describe('getUserNotifications Analytics Flow', () => {
    it('must exactly tally and categorize notifications into isolated target account streams', () => {
      const result = notificationService.getUserNotifications('user-alpha');

      expect(result.unreadCount).toBe(2);
      expect(result.streams.accountBills).toHaveLength(1);
      expect(result.streams.accountBills[0].id).toBe('unit-alert-bill');
      
      expect(result.streams.adminAnnouncements).toHaveLength(1);
      expect(result.streams.adminAnnouncements[0].id).toBe('unit-alert-announce');
    });

    it('returns empty collections cleanly if a targeted user context has zero associated data entries', () => {
      const result = notificationService.getUserNotifications('user-empty-999');

      expect(result.unreadCount).toBe(0);
      expect(result.streams.accountBills).toHaveLength(0);
      expect(result.streams.adminAnnouncements).toHaveLength(0);
    });
  });

  describe('markAsRead Boundary Logic Controls', () => {
    it('alters records flags accurately inside storage structures upon legitimate interaction tracking matches', () => {
      const result = notificationService.markAsRead('unit-alert-bill', 'user-alpha');

      expect(result.errorType).toBeNull();
      expect(result.data.modified).toBe(true);
      expect(result.data.is_read).toBe(true);


      const verifiedRecord = notificationModel.findById('unit-alert-bill');
      expect(verifiedRecord.is_read).toBe(true);
    });

    it('intercepts processing loops returning an error code contract matching FORBIDDEN profiles when accessing cross-account sets', () => {
      const result = notificationService.markAsRead('unit-alert-foreign', 'user-alpha');

      expect(result.errorType).toBe('FORBIDDEN');
      expect(result.data.error).toBe('Forbidden');
      
      const recordState = notificationModel.findById('unit-alert-foreign');
      expect(recordState.is_read).toBe(false);
    });

    it('returns an error code contract matching NOT_FOUND parameters when provided a non-existent lookup ID key', () => {
      const result = notificationService.markAsRead('non-existent-alert-uuid', 'user-alpha');

      expect(result.errorType).toBe('NOT_FOUND');
      expect(result.data.error).toBe('Not Found');
    });
  });
});