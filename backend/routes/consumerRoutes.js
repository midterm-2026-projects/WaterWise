import express from 'express';
import { getProfile } from '../controllers/consumerController.js';

const router = express.Router();

router.get('/api/profile', getProfile);

export default router;
