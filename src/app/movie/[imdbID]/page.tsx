"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTheatres } from "@/services/theatreService";
import { useRouter } from "next/navigation";


import { getMovieDetails } from "@/services/movieDetails";

interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
}
interface Theatre {
  id: string;
  name: string;
  city: string;
}

export default function MoviePage() {
  const params = useParams();

  const imdbID = params.imdbID as string;

  const [movie, setMovie] =
    useState<Movie | null>(null);
  const [theatres, setTheatres] =
  useState<Theatre[]>([]);
  

const [selectedTheatre,
setSelectedTheatre] =
  useState(""); 
const [selectedDate, setSelectedDate] =
  useState("");   
const [selectedTime,
setSelectedTime] =
  useState(""); 
const router = useRouter();  



  useEffect(() => {
   const fetchData = async () => {
  try {
    const movieData =
      await getMovieDetails(imdbID);

    setMovie(movieData);

    const theatreData =
      await getTheatres();
    
   

    setTheatres(theatreData);
  } catch (error) {
    console.log(error);
  }
};

if (imdbID) {
  fetchData();
}
  }, [imdbID]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

const showTimes = [
  "10:00 AM",
  "01:00 PM",
  "04:00 PM",
  "07:00 PM",
  "10:00 PM",
];  
const dates = Array.from(
  { length: 4 },
  (_, index) => {
    const date = new Date();

    date.setDate(
      date.getDate() + index
    );

    return date
      .toISOString()
      .split("T")[0];
  }
);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid md:grid-cols-2 gap-10">

          <img
            src={movie.Poster}
            alt={movie.Title}
            className="rounded-2xl w-full"
          />

          <div>

            <h1 className="text-5xl font-bold mb-4">
              {movie.Title}
            </h1>

            <div className="flex gap-4 mb-6">

              <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
                ⭐ {movie.imdbRating}
              </span>

              <span className="bg-zinc-800 px-4 py-2 rounded-lg">
                {movie.Year}
              </span>

            </div>

            <p className="text-gray-300 mb-4">
              {movie.Genre}
            </p>

            <p className="mb-4">
              <strong>Director:</strong>{" "}
              {movie.Director}
            </p>

            <p className="mb-4">
              <strong>Cast:</strong>{" "}
              {movie.Actors}
            </p>

            <p className="text-gray-300 mb-8">
              {movie.Plot}
            </p>
            <div className="mb-6">

  <label className="block mb-2">
    Select Theatre
  </label>

  <select
    value={selectedTheatre}
    onChange={(e) =>
      setSelectedTheatre(
        e.target.value
      )
    }
    className="
      w-full
      bg-zinc-900
      p-3
      rounded-lg
    "
  >
    <option value="">
      Choose Theatre
    </option>

    {theatres.map(
      (theatre) => (
        <option
          key={theatre.id}
          value={theatre.id}
        >
          {theatre.name}
          {" - "}
          {theatre.city}
        </option>
      )
    )}
  </select>
<div className="mb-6">

  <label className="block mb-2">
    Select Date
  </label>

  <select
    value={selectedDate}
    onChange={(e) =>
      setSelectedDate(
        e.target.value
      )
    }
    className="
      w-full
      bg-zinc-900
      p-3
      rounded-lg
    "
  >
    <option value="">
      Choose Date
    </option>

    {dates.map((date) => (
      <option
        key={date}
        value={date}
      >
        {new Date(date)
          .toLocaleDateString(
            "en-IN",
            {
              weekday: "short",
              day: "numeric",
              month: "short",
            }
          )}
      </option>
    ))}
  </select>

</div>  

</div>
<div className="mb-6">

  <label className="block mb-3">
    Select Show Time
  </label>

  <div className="flex flex-wrap gap-3">

    {showTimes.map((time) => (
      <button
        key={time}
        type="button"
        onClick={() =>
          setSelectedTime(time)
        }
        className={`
          px-4 py-2 rounded-lg border
          ${
            selectedTime === time
              ? "bg-red-600 border-red-600"
              : "bg-zinc-900 border-zinc-700"
          }
        `}
      >
        {time}
      </button>
    ))}

  </div>

</div>


<button
  onClick={() =>
    router.push(
      `/seats?theatre=${selectedTheatre}&date=${selectedDate}&time=${selectedTime}&movie=${encodeURIComponent(
        movie.Title
      )}&movieId=${imdbID}`
    )
  }
  disabled={
    !selectedTheatre ||
    !selectedDate ||
    !selectedTime
  }
  className="
    bg-red-600
    px-8
    py-3
    rounded-xl
    font-semibold
    disabled:opacity-50
  "
>
  Book Tickets
</button>
</div>
</div>
</div>
</main>
);
}