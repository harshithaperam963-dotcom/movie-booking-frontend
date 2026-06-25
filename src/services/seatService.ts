import axios from "axios";

const API_URL =
  "http://localhost:5000/api";

export const getSeats = async (
  showId: string
) => {
  const response =
    await axios.get(
      `${API_URL}/seats?showId=${showId}`
    );

  return response.data;
};

export const reserveSeats = async (
  seatIds: string[],
  movieId: string,
  theatreId: string
) => {
  const response =
    await axios.post(
      `${API_URL}/reservations`,
      {
        seatIds,
        movieId,
        theatreId,
      }
    );

  return response.data;
};