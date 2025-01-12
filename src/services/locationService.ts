import apiClient from "@/config/axiosConfig";
import { Locations } from "@/lib/types";

export const getLocations = async () => {
  const response = await apiClient.get("/locations");

  return response.data;
};

export const addLocation = async (location: Locations) => {
  const response = await apiClient.post("/locations", location);
  return response.data;
};

export const searchOpenWeatherMap = async (location: string) => {
  const API_URL = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL;
  const API_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
  try {
    const response = await apiClient.get("", {
      baseURL: `${API_URL}${location}&appid=${API_key}`,
    });
    return response.data;
  } catch (error) {
    return "404";
  }
};

export const searchLocation = async (location: string) => {
  const response = await apiClient.get(
    Boolean(location) ? `/locations/search/?city=${location}` : "/locations"
  );

  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await apiClient.delete(`/locations/${id}`);

  return response.data;
};
