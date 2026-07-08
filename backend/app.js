import express from 'express';
import notificationRoutes from './routes/notificationRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import purokPredictionRoutes from "./routes/consumption.routes.js";
// import consumptionRankingRoutes from "./routes/consumptionRanking.routes.js";

const app = express();

app.use(express.json());
app.use(notificationRoutes);
app.use(predictionRoutes);
app.use("/purok-prediction", purokPredictionRoutes);
// app.use("/consumption-ranking", consumptionRankingRoutes);
export default app;