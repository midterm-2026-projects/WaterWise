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

  const { errorType, data } = notificationService.markAsRead(req.params.id, req.user.id);
  
  if (errorType === 'NOT_FOUND') return res.status(404).json(data);
  if (errorType === 'FORBIDDEN') return res.status(403).json(data);
  
  return res.status(200).json(data);
});

export default router;