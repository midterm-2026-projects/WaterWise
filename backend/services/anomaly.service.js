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

// Gemini Helper Function
const generateAnomalyAnalysis = async (
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

// Overall Monthly Anomaly
export const generateOverallMonthlyAnomaly =
async () => {
  const historical =
    getOverallMonthlyHistory();

  const prompt = `
You are an AI water consumption anomaly detector.

Analyze the historical monthly water consumption.

Responsibilities:
- Detect ONLY abnormal consumption spikes.
- Ignore normal fluctuations.
- Compare the latest trend with historical values.
- Classify the anomaly severity.

Severity Levels:
NORMAL
LOW
MEDIUM
HIGH
CRITICAL

If no anomaly exists:
- status = "NORMAL"
- hasAnomaly = false
- riskScore = 0
- summary should explain that no abnormal consumption was detected.
- anomalies must be an empty array.

Return ONLY valid JSON.

{
  "status":"NORMAL | LOW | MEDIUM | HIGH | CRITICAL",
  "hasAnomaly":true,
  "riskScore":84,
  "summary":"",
  "anomalies":[
    {
      "period":"",
      "actualConsumption":0,
      "expectedConsumption":0,
      "percentIncrease":0,
      "reason":""
    }
  ]
}

Historical Data:

${JSON.stringify(historical)}
`;

  return await generateAnomalyAnalysis(
    prompt
  );
};

// Overall Yearly Anomaly
export const generateOverallYearlyAnomaly =
async () => {
  const historical =
    getOverallYearlyHistory();

  const prompt = `
You are an AI water consumption anomaly detector.

Analyze the historical yearly water consumption.

Responsibilities:
- Detect ONLY abnormal consumption spikes.
- Ignore normal fluctuations.
- Compare the latest trend with historical values.
- Classify the anomaly severity.

Severity Levels:
NORMAL
LOW
MEDIUM
HIGH
CRITICAL

If no anomaly exists:
- status = "NORMAL"
- hasAnomaly = false
- riskScore = 0
- summary should explain that no abnormal consumption was detected.
- anomalies must be an empty array.

Return ONLY valid JSON.

{
  "status":"NORMAL | LOW | MEDIUM | HIGH | CRITICAL",
  "hasAnomaly":true,
  "riskScore":84,
  "summary":"",
  "anomalies":[
    {
      "period":"",
      "actualConsumption":0,
      "expectedConsumption":0,
      "percentIncrease":0,
      "reason":""
    }
  ]
}

Historical Data:

${JSON.stringify(historical)}
`;

  return await generateAnomalyAnalysis(
    prompt
  );
};

// Per Purok Monthly Anomaly
export const generatePerPurokMonthlyAnomaly =
async (purok) => {
  const historical =
    getPerPurokMonthlyHistory(
      purok
    );

  const prompt = `
You are an AI water consumption anomaly detector.

Purok:

${purok}

Analyze the historical monthly water consumption.

Responsibilities:
- Detect ONLY abnormal consumption spikes.
- Ignore normal fluctuations.
- Compare the latest trend with historical values.
- Classify the anomaly severity.

Severity Levels:
NORMAL
LOW
MEDIUM
HIGH
CRITICAL

If no anomaly exists:
- status = "NORMAL"
- hasAnomaly = false
- riskScore = 0
- summary should explain that no abnormal consumption was detected.
- anomalies must be an empty array.

Return ONLY valid JSON.

{
  "purok":"${purok}",
  "status":"NORMAL | LOW | MEDIUM | HIGH | CRITICAL",
  "hasAnomaly":true,
  "riskScore":84,
  "summary":"",
  "anomalies":[
    {
      "period":"",
      "actualConsumption":0,
      "expectedConsumption":0,
      "percentIncrease":0,
      "reason":""
    }
  ]
}

Historical Data:

${JSON.stringify(historical)}
`;

  return await generateAnomalyAnalysis(
    prompt
  );
};

// Per Puroks Yearly Anomaly
export const generatePerPurokYearlyAnomaly =
async (purok) => {
  const historical =
    getPerPurokYearlyHistory(
      purok
    );

  const prompt = `
You are an AI water consumption anomaly detector.

Purok:

${purok}

Analyze the historical yearly water consumption.

Responsibilities:
- Detect ONLY abnormal consumption spikes.
- Ignore normal fluctuations.
- Compare the latest trend with historical values.
- Classify the anomaly severity.

Severity Levels:
NORMAL
LOW
MEDIUM
HIGH
CRITICAL

If no anomaly exists:
- status = "NORMAL"
- hasAnomaly = false
- riskScore = 0
- summary should explain that no abnormal consumption was detected.
- anomalies must be an empty array.

Return ONLY valid JSON.

{
  "purok":"${purok}",
  "status":"NORMAL | LOW | MEDIUM | HIGH | CRITICAL",
  "hasAnomaly":true,
  "riskScore":84,
  "summary":"",
  "anomalies":[
    {
      "period":"",
      "actualConsumption":0,
      "expectedConsumption":0,
      "percentIncrease":0,
      "reason":""
    }
  ]
}

Historical Data:

${JSON.stringify(historical)}
`;

  return await generateAnomalyAnalysis(
    prompt
  );
};

// All Puroks Monthly Anomaly
export const generateAllPuroksMonthlyAnomaly =
async () => {
  const historical =
    getAllPuroksMonthlyHistory();

  const prompt = `
You are an AI water consumption anomaly detector.

Analyze the historical monthly water consumption of every purok.

Responsibilities:
- Detect ONLY abnormal consumption spikes.
- Ignore normal fluctuations.
- Compare the latest trend with historical values.
- Classify the anomaly severity for every purok.

Severity Levels:
NORMAL
LOW
MEDIUM
HIGH
CRITICAL

If a purok has no anomaly:
- status = "NORMAL"
- hasAnomaly = false
- riskScore = 0
- summary should explain that no abnormal consumption was detected.
- anomalies must be an empty array.

Return ONLY valid JSON.

[
  {
    "purok":"Purok 1",
    "status":"NORMAL | LOW | MEDIUM | HIGH | CRITICAL",
    "hasAnomaly":true,
    "riskScore":84,
    "summary":"",
    "anomalies":[
      {
        "period":"",
        "actualConsumption":0,
        "expectedConsumption":0,
        "percentIncrease":0,
        "reason":""
      }
    ]
  }
]

Historical Data:

${JSON.stringify(historical)}
`;

  return await generateAnomalyAnalysis(
    prompt
  );
};

// All Puroks Yearly Anomaly
export const generateAllPuroksYearlyAnomaly =
async () => {
  const historical =
    getAllPuroksYearlyHistory();

  const prompt = `
You are an AI water consumption anomaly detector.

Analyze the historical yearly water consumption of every purok.

Responsibilities:
- Detect ONLY abnormal consumption spikes.
- Ignore normal fluctuations.
- Compare the latest trend with historical values.
- Classify the anomaly severity for every purok.

Severity Levels:
NORMAL
LOW
MEDIUM
HIGH
CRITICAL

If a purok has no anomaly:
- status = "NORMAL"
- hasAnomaly = false
- riskScore = 0
- summary should explain that no abnormal consumption was detected.
- anomalies must be an empty array.

Return ONLY valid JSON.

[
  {
    "purok":"Purok 1",
    "status":"NORMAL | LOW | MEDIUM | HIGH | CRITICAL",
    "hasAnomaly":true,
    "riskScore":84,
    "summary":"",
    "anomalies":[
      {
        "period":"",
        "actualConsumption":0,
        "expectedConsumption":0,
        "percentIncrease":0,
        "reason":""
      }
    ]
  }
]

Historical Data:

${JSON.stringify(historical)}
`;

  return await generateAnomalyAnalysis(
    prompt
  );
};

// All Anomalies
export const generateAllAnomaliesService =
async () => {

  const [
    overallMonthly,
    overallYearly,
    allPuroksMonthly,
    allPuroksYearly,
  ] = await Promise.all([
    generateOverallMonthlyAnomaly(),
    generateOverallYearlyAnomaly(),
    generateAllPuroksMonthlyAnomaly(),
    generateAllPuroksYearlyAnomaly(),
  ]);

  return {
    overallMonthly,
    overallYearly,
    allPuroksMonthly,
    allPuroksYearly,
  };

};