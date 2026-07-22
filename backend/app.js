import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/AuthRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import consumptionRoutes from "./routes/consumption.routes.js";
import consumptionHistoryRoutes from "./routes/consumptionHistory.routes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import meterReadingRoutes from "./routes/meterReading.routes.js";

import anomaly from "./routes/anomalyRoutes.js";
import recomendationRoutes from "./routes/recommendationRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.disable("x-powered-by");
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use(billingRoutes);
app.use(consumerRoutes);
app.use(notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", meterReadingRoutes);
app.use("/api/consumption", consumptionRoutes);
app.use("/api/consumption", consumptionHistoryRoutes);

app.use(
  "/api/anomaly",
  anomaly
);

app.use(
  "/api/recommendation",
  recomendationRoutes
);

const PORT = Number(process.env.PORT) || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`WaterWise Backend running on http://localhost:${PORT}`);
  });
}

export default app;
