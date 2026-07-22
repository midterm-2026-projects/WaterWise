import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (configuredBaseUrl || "/api").replace(/\/$/, "");

export async function fetchConsumerDirectory(options = {}) {
  const response = await axios.get(`${API_BASE_URL}/consumers`, {
    withCredentials: true,
    headers: { Accept: "application/json" },
    ...options,
  });
  return Array.isArray(response.data?.data) ? response.data.data : [];
}
