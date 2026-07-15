import express from 'express';
import {
  getNotifications,
  markNotificationAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/api/notifications', getNotifications);
router.put('/api/notifications/:id/read', markNotificationAsRead);

export default router;
