import {
  generatePurokMonthlyPrediction,
  generatePurokYearlyPrediction,
  generateMonthlyPrediction,
  generateYearlyPrediction,
} from "../services/prediction.service.js";

export const getPurokMonthlyPrediction = (
  req,
  res
) => {
  const predictions =
    generatePurokMonthlyPrediction();

  res.status(200).json(predictions);
};

export const getPurokYearlyPrediction = (
  req,
  res
) => {
  const predictions =
    generatePurokYearlyPrediction();

  res.status(200).json(predictions);
};

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