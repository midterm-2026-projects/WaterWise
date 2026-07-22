import { consumerService } from '../services/consumerService.js';
import { getCurrentUser } from '../services/AuthService.js';

export const getConsumers = async (_req, res) => {
  try {
    return res.status(200).json({ data: await consumerService.listConsumers() });
  } catch {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve consumers.'
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user ?? await getCurrentUser();
    const profileId = user.id;
    const profile = await consumerService.getProfile(profileId);

    return res.status(200).json(profile);
  } catch (error) {
    if (error.code === 'UNAUTHORIZED') {
      return res.status(401).json({ error: 'Unauthorized', message: error.message });
    }

    if (error.code === 'PROFILE_NOT_FOUND') {
      return res.status(404).json({ error: 'Not Found', message: error.message });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to retrieve the consumer profile.'
    });
  }
};

export const getConsumerProfile = getProfile;
