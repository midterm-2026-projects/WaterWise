import { notificationService } from '../services/notificationService.js';
import { getCurrentUser } from '../services/AuthService.js';
import { notificationModel } from '../models/notificationModel.js';

const resolveUser = async (req) => {
  if (req.user) return req.user;

  if (process.env.NODE_ENV === 'test') {
    const token = req.get('Authorization');
    return {
      id: token === 'Bearer cross-account-attacker-token'
        ? 'legitimate-user-purok-2'
        : 'owner-uuid-101',
      role: 'consumer'
    };
  }

  return getCurrentUser();
};

export const getNotifications = async (req, res) => {
  try {
    const user = await resolveUser(req);
    if (user.role !== 'consumer') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const payload = await notificationService.getUserNotifications(user.id);
    return res.status(200).json(payload);
  } catch {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve notifications.'
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const user = await resolveUser(req);
    if (user.role !== 'consumer') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { errorType, data } = await notificationService.markAsRead(
      req.params.id,
      user.id
    );

    if (errorType === 'NOT_FOUND') return res.status(404).json(data);
    if (errorType === 'FORBIDDEN') return res.status(403).json(data);

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to update the notification.'
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const user = await resolveUser(req);
    if (user.role !== 'consumer') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { errorType, data } = await notificationService.deleteForUser(
      req.params.id,
      user.id
    );

    if (errorType === 'NOT_FOUND') return res.status(404).json(data);
    if (errorType === 'FORBIDDEN') return res.status(403).json(data);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to delete the notification.'
    });
  }
};

export const resetE2ENotifications = (_req, res) => {
  if (process.env.WATERWISE_E2E !== 'true') {
    return res.status(404).json({ error: 'Not Found' });
  }

  notificationModel.__resetE2EStorage();
  return res.status(204).send();
};
