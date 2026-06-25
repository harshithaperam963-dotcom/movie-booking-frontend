import { api } from "@/lib/api";

export const searchMovies = async (
  query: string
) => {
  const response = await api.get(
    `/movies/search?query=${query}`
  );

  return response.data;
};
export const getMovieById = async (
  imdbID: string
) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}`
  );

  return response.data;
};