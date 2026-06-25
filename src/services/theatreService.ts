import { api } from "@/lib/api";

export const getTheatres = async () => {
  const response = await api.get("/theatres");
  return response.data;
};