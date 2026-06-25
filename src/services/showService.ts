import { api } from "@/lib/api";

export const getShows = async () => {
  const response = await api.get("/shows");
  return response.data;
};