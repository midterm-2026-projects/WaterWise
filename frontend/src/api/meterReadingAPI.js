import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (configuredBaseUrl || "/api").replace(/\/$/, "");
const client = axios.create({ baseURL: `${API_BASE_URL}/meter-readings`, withCredentials: true });

export async function fetchMeterReadings(options = {}) {
  const response = await client.get("/", options);
  return Array.isArray(response.data) ? response.data : [];
}

export async function createMeterReading(payload, options = {}) {
  const response = await client.post("/", payload, options);
  return response.data?.data ?? response.data;
}

export default client;
