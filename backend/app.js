import "dotenv/config";
import express from 'express';
import notificationRoutes from './routes/notificationRoutes.js';
import consumptionRoutes from "./routes/consumption.routes.js";

const app = express();

app.use(express.json());
app.use(notificationRoutes);
app.use("/api/consumption",consumptionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 WaterWise Backend running on http://localhost:${PORT}`);
});
export default app;