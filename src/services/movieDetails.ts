import { api } from "@/lib/api";

export const getMovieDetails = async (
  imdbID: string
) => {
  const response = await api.get(
    `/movies/${imdbID}`
  );

  return response.data;
};