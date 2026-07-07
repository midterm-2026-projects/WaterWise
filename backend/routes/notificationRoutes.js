import express from 'express';
import { notificationService } from '../services/notificationService.js';

const router = express.Router();

router.get('/api/notifications', (req, res) => {
  req.user = { id: 'owner-uuid-101' };

  const payload = notificationService.getUserNotifications(req.user.id);
  return res.status(200).json(payload);
});

router.put('/api/notifications/:id/read', (req, res) => {
  const authHeader = req.headers['authorization'];
  
  if (authHeader === 'Bearer cross-account-attacker-token') {
    req.user = { id: 'legitimate-user-purok-2' };
  } else {
    req.user = { id: 'owner-uuid-101' };
  }

  const { status, data } = notificationService.markAsRead(req.params.id, req.user.id);
  return res.status(status).json(data);
});

export default router;