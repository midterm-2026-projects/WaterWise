import {
  generateOverallMonthlyAnomaly,
  generateOverallYearlyAnomaly,
  generatePerPurokMonthlyAnomaly,
  generatePerPurokYearlyAnomaly,
  generateAllPuroksMonthlyAnomaly,
  generateAllPuroksYearlyAnomaly,
  generateAllAnomaliesService,
} from "../services/anomaly.service.js";

// Overall

// Get Monthly Anomaly
export const getOverallMonthlyAnomaly = async (req, res) => {
  try {
    const anomaly =
      await generateOverallMonthlyAnomaly();

    res.status(200).json({
      success: true,
      data: anomaly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Yearly Anomaly
export const getOverallYearlyAnomaly = async (req, res) => {
  try {
    const anomaly =
      await generateOverallYearlyAnomaly();

    res.status(200).json({
      success: true,
      data: anomaly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Purok

// Get Monthly Anomaly
export const getPerPurokMonthlyAnomaly = async (req, res) => {
  try {
    const { purok } = req.params;

    const anomaly =
      await generatePerPurokMonthlyAnomaly(
        purok
      );

    res.status(200).json({
      success: true,
      data: anomaly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Yearly Anomaly
export const getPerPurokYearlyAnomaly = async (req, res) => {
  try {
    const { purok } = req.params;

    const anomaly =
      await generatePerPurokYearlyAnomaly(
        purok
      );

    res.status(200).json({
      success: true,
      data: anomaly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// All Puroks

// Get Monthly Anomaly
export const getAllPuroksMonthlyAnomaly = async (req, res) => {
  try {
    const anomaly =
      await generateAllPuroksMonthlyAnomaly();

    res.status(200).json({
      success: true,
      data: anomaly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Yearly Anomaly
export const getAllPuroksYearlyAnomaly = async (req, res) => {
  try {
    const anomaly =
      await generateAllPuroksYearlyAnomaly();

    res.status(200).json({
      success: true,
      data: anomaly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Generate All Anomalies
export const generateAllAnomalies = async (req, res) => {
  try {
    const anomalies =
      await generateAllAnomaliesService();

    res.status(200).json({
      success: true,
      data: anomalies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};