import axios from "axios";

const recommendationAPI = axios.create({
  baseURL: "http://localhost:5000/api/recommendation",
});

//Overall Recommendation API

//Get Overall Monthly Recommendations
export const fetchOverallMonthlyRecommendations = async () => {
  const response = await recommendationAPI.get(
    "/overall/monthly"
  );

  return response.data;
};

//Get Overall Yearly Recommendations
export const fetchOverallYearlyRecommendations = async () => {
  const response = await recommendationAPI.get(
    "/overall/yearly"
  );

  return response.data;
};

//Purok Recommendation API

//Get Purok Monthly Recommendations
export const fetchPerPurokMonthlyRecommendations = async (purok) => {
  const response = await recommendationAPI.get(
    `/purok/${purok}/monthly`
  );

  return response.data;
};

//Get Purok Yearly Recommendations
export const fetchPerPurokYearlyRecommendations = async (purok) => {
  const response = await recommendationAPI.get(
    `/purok/${purok}/yearly`
  );

  return response.data;
};

//All Puroks Recommendation API

//Get All Puroks Monthly Recommendations
export const fetchAllPuroksMonthlyRecommendations = async () => {
  const response = await recommendationAPI.get(
    "/puroks/monthly"
  );

  return response.data;
};

//Get All Puroks Yearly Recommendations
export const fetchAllPuroksYearlyRecommendations = async () => {
  const response = await recommendationAPI.get(
    "/puroks/yearly"
  );

  return response.data;
};

//All Recommendation API

//Get All Recommendations
export const fetchAllRecommendations = async () => {
  const response = await recommendationAPI.get("/");

  return response.data;
};

export default recommendationAPI;