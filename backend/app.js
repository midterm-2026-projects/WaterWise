import "dotenv/config";
import express from "express";

import authRoutes from "./routes/AuthRoutes.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import consumptionRoutes from "./routes/consumption.routes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(consumerRoutes);
app.use(notificationRoutes);
app.use("/api/consumption", consumptionRoutes);

const PORT = Number(process.env.PORT) || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`WaterWise Backend running on http://localhost:${PORT}`);
  });
}

export default app;
