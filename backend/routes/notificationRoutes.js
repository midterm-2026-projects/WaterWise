import express from 'express';
import {
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
  resetE2ENotifications
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/api/notifications', getNotifications);
router.put('/api/notifications/:id/read', markNotificationAsRead);
router.delete('/api/notifications/:id', deleteNotification);
router.post('/api/test/notifications/reset', resetE2ENotifications);

export default router;
