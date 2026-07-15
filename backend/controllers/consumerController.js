import { consumerService } from '../services/consumerService.js';

export const getProfile = async (req, res) => {
  try {
    const profileId = req.user?.id ?? 'owner-uuid-101';
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
