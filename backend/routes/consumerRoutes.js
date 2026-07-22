import express from 'express';
import { getConsumers, getProfile } from '../controllers/consumerController.js';

const router = express.Router();

router.get('/api/profile', getProfile);
router.get('/api/consumers', getConsumers);

export default router;
