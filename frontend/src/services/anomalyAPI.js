import axios from "axios";

const anomalyAPI = axios.create({
  baseURL: "http://localhost:5000/api/anomaly",
});

//Overall Anomaly API

//Get Overall Monthly Anomaly
export const fetchOverallMonthlyAnomaly = async () => {
  const response = await anomalyAPI.get("/overall/monthly");
  return response.data;
};

//Get Overall Yearly Anomaly
export const fetchOverallYearlyAnomaly = async () => {
  const response = await anomalyAPI.get("/overall/yearly");
  return response.data;
};

//Purok Anomaly API

//Get Purok Monthly Anomaly
export const fetchPerPurokMonthlyAnomaly = async (purok) => {
  const response = await anomalyAPI.get(
    `/purok/${purok}/monthly`
  );

  return response.data;
};

//Get Purok Yearly Anomaly
export const fetchPerPurokYearlyAnomaly = async (purok) => {
  const response = await anomalyAPI.get(
    `/purok/${purok}/yearly`
  );

  return response.data;
};

//All Puroks Anomaly API

//Get All Puroks Monthly Anomaly
export const fetchAllPuroksMonthlyAnomaly = async () => {
  const response = await anomalyAPI.get(
    "/puroks/monthly"
  );

  return response.data;
};

//Get All Puroks Yearly Anomaly
export const fetchAllPuroksYearlyAnomaly = async () => {
  const response = await anomalyAPI.get(
    "/puroks/yearly"
  );

  return response.data;
};

//Generate Anomaly API

//Generate All Anomalies
export const generateAllAnomalies = async () => {
  const response = await anomalyAPI.get("/all");

  return response.data;
};

export default anomalyAPI;