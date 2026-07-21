import {
  generateOverallMonthlyRecommendations,
  generateOverallYearlyRecommendations,
  generatePerPurokMonthlyRecommendations,
  generatePerPurokYearlyRecommendations,
  generateAllPuroksMonthlyRecommendations,
  generateAllPuroksYearlyRecommendations,
  generateAllRecommendationsService,
} from "../services/recommendation.service.js";

// Overall

// Get Monthly Recommendations
export const getOverallMonthlyRecommendations = async (req, res) => {
  try {
    const data =
      await generateOverallMonthlyRecommendations();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Yearly Recommendations
export const getOverallYearlyRecommendations = async (req, res) => {
  try {
    const data =
      await generateOverallYearlyRecommendations();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Purok

// Get Monthly Recommendations
export const getPerPurokMonthlyRecommendations = async (req, res) => {
  try {
    const { purok } = req.params;

    const data =
      await generatePerPurokMonthlyRecommendations(
        purok
      );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Yearly Recommendations
export const getPerPurokYearlyRecommendations = async (req, res) => {
  try {
    const { purok } = req.params;

    const data =
      await generatePerPurokYearlyRecommendations(
        purok
      );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// All Puroks

// Get Monthly Recommendations
export const getAllPuroksMonthlyRecommendations = async (req, res) => {
  try {
    const data =
      await generateAllPuroksMonthlyRecommendations();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Yearly Recommendations
export const getAllPuroksYearlyRecommendations = async (req, res) => {
  try {
    const data =
      await generateAllPuroksYearlyRecommendations();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Generate All Recommendations
export const getAllRecommendations = async (req, res) => {
  try {
    const data =
      await generateAllRecommendationsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};