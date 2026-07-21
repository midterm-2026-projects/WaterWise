import { getCurrentUser } from "../services/AuthService.js";

export async function authenticateConsumptionHistory(req, res, next) {
  try {
    req.user = await getCurrentUser();
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }
}
