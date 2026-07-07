import express from 'express';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

app.use(express.json());
app.use(notificationRoutes);

export default app;