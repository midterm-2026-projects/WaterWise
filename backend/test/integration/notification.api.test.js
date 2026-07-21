import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import notificationRouter from '../../routes/notificationRoutes.js';
import { notificationModel } from '../../models/notificationModel.js';

const app = express();
app.use(express.json());
app.use(notificationRouter);

const adminApp = express();
adminApp.use((req, _res, next) => {
  req.user = { id: 1, role: 'admin' };
  next();
});
adminApp.use(notificationRouter);

describe('Notification API Integration', () => {
  beforeEach(() => {
    notificationModel.__resetStorage([
      {
        id: 'valid-alert-101',
        profile_id: 'owner-uuid-101',
        category: 'bill',
        is_read: false
      },
      {
        id: 'alert-id-purok-1',
        profile_id: 'original-owner-purok-1',
        category: 'announcement',
        is_read: false
      }
    ]);
  });

  it('should return an HTTP 403 Forbidden status code when passing an invalid or cross-account notification ID parameter', async () => {
    const response = await request(app)
      .put('/api/notifications/alert-id-purok-1/read')
      .set('Authorization', 'Bearer cross-account-attacker-token');

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Forbidden');
  });

  it('should successfully alter the records flag to true in the database when an unread alert card is clicked', async () => {
    const response = await request(app)
      .put('/api/notifications/valid-alert-101/read')
      .set('Authorization', 'Bearer safe-legitimate-token-string');

    expect(response.status).toBe(200);
    expect(response.body.modified).toBe(true);
    expect(response.body.is_read).toBe(true);
  });

  it('deletes a notification from the consumer account permanently', async () => {
    const response = await request(app)
      .delete('/api/notifications/valid-alert-101')
      .set('Authorization', 'Bearer safe-legitimate-token-string');
    const reloaded = await request(app)
      .get('/api/notifications')
      .set('Authorization', 'Bearer safe-legitimate-token-string');

    expect(response.status).toBe(200);
    expect(response.body.deleted).toBe(true);
    expect(reloaded.body.streams.accountBills).toEqual([]);
  });

  it('does not expose notifications to an administrator', async () => {
    const response = await request(adminApp).get('/api/notifications');

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Forbidden');
  });
});
