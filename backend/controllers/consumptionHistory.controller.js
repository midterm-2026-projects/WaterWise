import { getConsumptionHistory } from "../services/consumptionHistory.service.js";

export async function listConsumptionHistory(req, res) {
  try {
    const year = req.query.year === undefined ? undefined : Number(req.query.year);

    if (year !== undefined && (!Number.isInteger(year) || year < 1)) {
      return res.status(400).json({
        message: "The year query parameter must be a positive integer.",
      });
    }

    const data = await getConsumptionHistory({
      userId: req.user.id,
      year,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve consumption history.",
    });
  }
}
