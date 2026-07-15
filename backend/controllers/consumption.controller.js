import {
  generatePurokMonthlyPrediction,
  generatePurokYearlyPrediction,
  generateMonthlyPrediction,
  generateYearlyPrediction,

  getConsumptionRanking,

  getOverallMonthlyHistory,
  getOverallYearlyHistory,
  getPerPurokMonthlyHistory,
  getPerPurokYearlyHistory,
  getAllPuroksMonthlyHistory as getAllPuroksMonthlyHistoryService,
  getAllPuroksYearlyHistory as getAllPuroksYearlyHistoryService,
  getAllHistoryConsumption,

  generateOverallMonthlyPrediction,
  generateOverallYearlyPrediction,
  generatePerPurokMonthlyPrediction,
  generatePerPurokYearlyPrediction,
  generateAllPuroksMonthlyPrediction,
  generateAllPuroksYearlyPrediction,
  generateAllPredictionsService,

  // listGeminiModels,
} from "../services/consumption.service.js";

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

// Rankings

export const getConsumptionRankingData = (
  req,
  res
) => {
  try {
    const ranking =
      getConsumptionRanking();

    res.status(200).json({
      success: true,
      data: ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve purok consumption ranking.",
    });
  }
};

// New Aggregation Functions

export const getMonthlyHistory = (
  req,
  res
) => {
  const history =
    getOverallMonthlyHistory();

  res.status(200).json(history);
};

export const getYearlyHistory = (
  req,
  res
) => {
  const history =
    getOverallYearlyHistory();

  res.status(200).json(history);
};

export const getPurokMonthlyHistory = (
  req,
  res
) => {
  const { purok } = req.params;

  const history =
    getPerPurokMonthlyHistory(
      purok
    );

  res.status(200).json(history);
};

export const getPurokYearlyHistory = (
  req,
  res
) => {
  const { purok } = req.params;

  const history =
    getPerPurokYearlyHistory(
      purok
    );

  res.status(200).json(history);
};

export const getAllPuroksMonthlyHistory = (
  req,
  res
) => {
  const history =
    getAllPuroksMonthlyHistoryService();

  res.status(200).json(history);
};

export const getAllPuroksYearlyHistory = (
  req,
  res
) => {
  const history =
    getAllPuroksYearlyHistoryService();

  res.status(200).json(history);
};

// Generate All History Consumption
export const generateAllHistoryConsumption =
  (req, res) => {
    try {
      const history =
        getAllHistoryConsumption();

      res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// New Prediction Functions Using AI

//  Overall Monthly Prediction
export const getOverallMonthlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateOverallMonthlyPrediction();

      res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//  Overall Yearly Prediction
export const getOverallYearlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateOverallYearlyPrediction();

      res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//  Per Purok Monthly Prediction
export const getPerPurokMonthlyPrediction =
  async (req, res) => {
    try {
      const { purok } = req.params;

      const prediction =
        await generatePerPurokMonthlyPrediction(
          purok
        );

      res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//  Per Purok Yearly Prediction
export const getPerPurokYearlyPrediction =
  async (req, res) => {
    try {
      const { purok } = req.params;

      const prediction =
        await generatePerPurokYearlyPrediction(
          purok
        );

      res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//  All Puroks Monthly Prediction
export const getAllPuroksMonthlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateAllPuroksMonthlyPrediction();

      res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//  All Puroks Yearly Prediction
export const getAllPuroksYearlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateAllPuroksYearlyPrediction();

      res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Generate All Predictions
export const generateAllPredictions =
  async (req, res) => {
    try {
      const predictions =
        await generateAllPredictionsService();

      res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Check for AI models

// export const getGeminiModels = async (req, res) => {
//   try {
//     const models = await listGeminiModels();
//
//     res.status(200).json({
//       success: true,
//       count: models.length,
//       data: models,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };