import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import notificationRouter from '../routes/notificationRoutes.js';

const app = express();
app.use(express.json());
app.use(notificationRouter);

describe('Notification Backend Integration', () => {

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
});