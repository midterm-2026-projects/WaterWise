import {
  ai,
  GEMINI_MODELS,
  isGeminiConfigured,
} from "../config/gemini.js";

import {
  getOverallMonthlyHistory,
  getOverallYearlyHistory,
  getPerPurokMonthlyHistory,
  getPerPurokYearlyHistory,
  getAllPuroksMonthlyHistory,
  getAllPuroksYearlyHistory,
} from "./consumption.service.js";

const generateRecommendations = async (
  prompt
) => {

  if (!isGeminiConfigured()) {
    throw new Error(
      "Gemini API key is not configured."
    );
  }

  let lastError;

  for (const model of GEMINI_MODELS) {

    try {

      console.log(`Trying model: ${model}`);

      const response =
        await ai.models.generateContent({
          model,
          contents: prompt,
        });

      console.log(`Success using ${model}`);

      return JSON.parse(response.text);

    } catch (error) {

      console.warn(
        `Model ${model} failed`
      );

      lastError = error;

    }

  }

  throw lastError;

};

// Overall Monthly
export const generateOverallMonthlyRecommendations =
async () => {
  const historical =
    getOverallMonthlyHistory();

  const prompt = `
You are an AI decision support assistant for a water utility administrator.

Historical monthly water consumption:

${JSON.stringify(historical)}

Generate ONLY practical and actionable administrative recommendations based on the observed consumption trend.

Rules:
- Base your recommendations ONLY on the historical data.
- Do NOT assume the exact cause of any increase or decrease.
- Do NOT speculate about leaks, illegal connections, damaged pipes, faulty meters, weather conditions, or population growth unless directly supported by the data.
- If consumption remains stable, recommend routine monitoring and continuous observation.
- If consumption shows a noticeable increase or decrease, recommend appropriate administrative actions without assuming the cause.
- Generate a maximum of 3 recommendations.
- Keep every recommendation concise, practical, and actionable.

Return ONLY valid JSON.

{
  "summary":"",
  "recommendations":[
    {
      "title":"",
      "description":""
    }
  ]
}
`;

  return await generateRecommendations(
    prompt
  );
};


// Overall Yearly
export const generateOverallYearlyRecommendations =
async () => {
  const historical =
    getOverallYearlyHistory();

  const prompt = `
You are an AI decision support assistant for a water utility administrator.

Historical yearly water consumption:

${JSON.stringify(historical)}

Generate ONLY practical and actionable administrative recommendations based on the observed consumption trend.

Rules:
- Base your recommendations ONLY on the historical data.
- Do NOT assume the exact cause of any increase or decrease.
- Do NOT speculate about leaks, illegal connections, damaged pipes, faulty meters, weather conditions, or population growth unless directly supported by the data.
- If consumption remains stable, recommend routine monitoring and continuous observation.
- If consumption shows a noticeable increase or decrease, recommend appropriate administrative actions without assuming the cause.
- Generate a maximum of 3 recommendations.
- Keep every recommendation concise, practical, and actionable.

Return ONLY valid JSON.

{
  "summary":"",
  "recommendations":[
    {
      "title":"",
      "description":""
    }
  ]
}
`;

  return await generateRecommendations(
    prompt
  );
};

// Per Purok Monthly
export const generatePerPurokMonthlyRecommendations =
async (purok) => {
  const historical =
    getPerPurokMonthlyHistory(
      purok
    );

  const prompt = `
You are an AI decision support assistant for a water utility administrator.

Purok:

${purok}

Historical monthly water consumption:

${JSON.stringify(historical)}

Generate ONLY practical and actionable administrative recommendations for this purok based on the observed consumption trend.

Rules:
- Base your recommendations ONLY on the historical data.
- Do NOT assume the exact cause of any increase or decrease.
- Do NOT speculate about leaks, illegal connections, damaged pipes, faulty meters, weather conditions, or population growth unless directly supported by the data.
- If consumption remains stable, recommend routine monitoring and continuous observation.
- If consumption shows a noticeable increase or decrease, recommend appropriate administrative actions without assuming the cause.
- Generate a maximum of 3 recommendations.
- Keep every recommendation concise, practical, and actionable.

Return ONLY valid JSON.

{
  "purok":"${purok}",
  "summary":"",
  "recommendations":[
    {
      "title":"",
      "description":""
    }
  ]
}
`;

  return await generateRecommendations(
    prompt
  );
};

// Pe Purok Yearly
export const generatePerPurokYearlyRecommendations =
async (purok) => {
  const historical =
    getPerPurokYearlyHistory(
      purok
    );

  const prompt = `
You are an AI decision support assistant for a water utility administrator.

Purok:

${purok}

Historical yearly water consumption:

${JSON.stringify(historical)}

Generate ONLY practical and actionable administrative recommendations for this purok based on the observed consumption trend.

Rules:
- Base your recommendations ONLY on the historical data.
- Do NOT assume the exact cause of any increase or decrease.
- Do NOT speculate about leaks, illegal connections, damaged pipes, faulty meters, weather conditions, or population growth unless directly supported by the data.
- If consumption remains stable, recommend routine monitoring and continuous observation.
- If consumption shows a noticeable increase or decrease, recommend appropriate administrative actions without assuming the cause.
- Generate a maximum of 3 recommendations.
- Keep every recommendation concise, practical, and actionable.

Return ONLY valid JSON.

{
  "purok":"${purok}",
  "summary":"",
  "recommendations":[
    {
      "title":"",
      "description":""
    }
  ]
}
`;

  return await generateRecommendations(
    prompt
  );
};

// All Puroks Monthly
export const generateAllPuroksMonthlyRecommendations =
async () => {
  const historical =
    getAllPuroksMonthlyHistory();

  const prompt = `
You are an AI decision support assistant for a water utility administrator.

Historical monthly water consumption for every purok:

${JSON.stringify(historical)}

Generate ONLY practical and actionable administrative recommendations for every purok based on the observed consumption trends.

Rules:
- Base your recommendations ONLY on the historical data.
- Do NOT assume the exact cause of any increase or decrease.
- Do NOT speculate about leaks, illegal connections, damaged pipes, faulty meters, weather conditions, or population growth unless directly supported by the data.
- If a purok has stable consumption, recommend routine monitoring and continuous observation.
- If a purok shows a noticeable increase or decrease, recommend appropriate administrative actions without assuming the cause.
- Generate a maximum of 3 recommendations for each purok.
- Keep every recommendation concise, practical, and actionable.

Return ONLY valid JSON.

[
  {
    "purok":"Purok 1",
    "summary":"",
    "recommendations":[
      {
        "title":"",
        "description":""
      }
    ]
  }
]
`;

  return await generateRecommendations(
    prompt
  );
};

// All Puroks Yearly
export const generateAllPuroksYearlyRecommendations =
async () => {
  const historical =
    getAllPuroksYearlyHistory();

  const prompt = `
You are an AI decision support assistant for a water utility administrator.

Historical yearly water consumption for every purok:

${JSON.stringify(historical)}

Generate ONLY practical and actionable administrative recommendations for every purok based on the observed consumption trends.

Rules:
- Base your recommendations ONLY on the historical data.
- Do NOT assume the exact cause of any increase or decrease.
- Do NOT speculate about leaks, illegal connections, damaged pipes, faulty meters, weather conditions, or population growth unless directly supported by the data.
- If a purok has stable consumption, recommend routine monitoring and continuous observation.
- If a purok shows a noticeable increase or decrease, recommend appropriate administrative actions without assuming the cause.
- Generate a maximum of 3 recommendations for each purok.
- Keep every recommendation concise, practical, and actionable.

Return ONLY valid JSON.

[
  {
    "purok":"Purok 1",
    "summary":"",
    "recommendations":[
      {
        "title":"",
        "description":""
      }
    ]
  }
]
`;

  return await generateRecommendations(
    prompt
  );
};

// All Recommendations Service
export const generateAllRecommendationsService =
async () => {
  const [
    overallMonthly,
    overallYearly,
    allPuroksMonthly,
    allPuroksYearly,
  ] = await Promise.all([
    generateOverallMonthlyRecommendations(),
    generateOverallYearlyRecommendations(),
    generateAllPuroksMonthlyRecommendations(),
    generateAllPuroksYearlyRecommendations(),
  ]);

  return {
    overallMonthly,
    overallYearly,
    allPuroksMonthly,
    allPuroksYearly,
  };
};