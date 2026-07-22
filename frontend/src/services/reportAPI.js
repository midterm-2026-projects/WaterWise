import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchGeneratedReports = async () => {
  const response = await axios.get(`${API_URL}/reports`);

  return response.data;
};

export const generateReport = async (payload) => {
  const response = await axios.post(`${API_URL}/reports/generate`, payload);

  return response.data;
};

export const downloadReportPDF = async (reportId) => {
  const response = await axios.get(`${API_URL}/reports/${reportId}/download`, {
    responseType: "blob",
  });

  return response.data;
};
