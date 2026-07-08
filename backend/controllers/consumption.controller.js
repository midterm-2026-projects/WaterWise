import {
  generateMonthlyPrediction,
  generateYearlyPrediction,
} from "../services/consumption.service.js";

export const getMonthlyPrediction = (
  req,
  res
) => {
  const predictions =
    generateMonthlyPrediction();

  res.status(200).json(predictions);
};

export const getYearlyPrediction = (
  req,
  res
) => {
  const predictions =
    generateYearlyPrediction();

  res.status(200).json(predictions);
};