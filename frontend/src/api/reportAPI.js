import axios from "axios";

const configuredBaseUrl =
  import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (configuredBaseUrl || "http://localhost:5000/api").replace(
  /\/$/,
  "",
);

const reportClient = axios.create({
  baseURL: `${API_BASE_URL}/reports`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export async function fetchGeneratedReports() {
  const response = await reportClient.get("/");
  return response.data?.data ?? [];
}

export async function fetchReportById(reportId) {
  const response = await reportClient.get(`/${reportId}`);
  return response.data?.data ?? null;
}

export async function generateReport(payload) {
  const response = await reportClient.post("/generate", payload);
  return response.data?.data ?? response.data;
}

export async function downloadReportPDF(reportId) {
  const response = await reportClient.get(`/${reportId}/download`, {
    responseType: "blob",
  });

  return response.data;
}

export default reportClient;
