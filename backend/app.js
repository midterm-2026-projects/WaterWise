import "dotenv/config";
import express from "express";

import authRoutes from "./routes/AuthRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import consumptionRoutes from "./routes/consumption.routes.js";
import consumptionHistoryRoutes from "./routes/consumptionHistory.routes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import anomaly from "./routes/anomalyRoutes.js";
import recomendationRoutes from "./routes/recommendationRoutes.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(billingRoutes);
app.use(consumerRoutes);
app.use(notificationRoutes);
app.use("/api/consumption", consumptionRoutes);
app.use("/api/consumption", consumptionHistoryRoutes);

app.use(anomaly);
app.use(recomendationRoutes);

const PORT = Number(process.env.PORT) || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`WaterWise Backend running on http://localhost:${PORT}`);
  });
}

export default app;
