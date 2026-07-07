import express from 'express';
import notificationRoutes from './routes/notificationRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';

const app = express();

app.use(express.json());
app.use(notificationRoutes);
app.use(predictionRoutes);

export default app;