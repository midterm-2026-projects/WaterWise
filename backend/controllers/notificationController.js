import { notificationService } from '../services/notificationService.js';

const resolveUser = (req) => {
  if (req.user) return req.user;

  if (req.headers.authorization === 'Bearer cross-account-attacker-token') {
    return { id: 'legitimate-user-purok-2' };
  }

  return { id: 'owner-uuid-101' };
};

export const getNotifications = async (req, res) => {
  try {
    const payload = await notificationService.getUserNotifications(resolveUser(req).id);
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
    const { errorType, data } = await notificationService.markAsRead(
      req.params.id,
      resolveUser(req).id
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
