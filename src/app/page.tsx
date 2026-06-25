"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { searchMovies } from "@/services/movieService";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

export default function Home() {
  const [search, setSearch] =
    useState("");

  const [movies, setMovies] =
    useState<Movie[]>([]);

  useEffect(() => {
    const delay =
      setTimeout(async () => {

        if (!search) return;

        try {
          const data =
            await searchMovies(search);

          setMovies(data.Search || []);
        } catch (error) {
          console.log(error);
        }

      }, 500);

    return () =>
      clearTimeout(delay);
  }, [search]);

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="relative h-[500px] flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="z-10 text-center px-4"
        >
          <h1 className="text-6xl font-bold mb-4">
            MY MOVIE
          </h1>

          <p className="text-gray-300 mb-8">
            Book Movie Tickets Instantly
          </p>

          <div className="relative max-w-xl mx-auto">

            <Search
              className="absolute left-3 top-3"
            />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search Movies..."
              className="pl-10 bg-zinc-900"
            />

          </div>

        </motion.div>

      </section>

      <section className="p-10">

        <h2 className="text-3xl font-bold mb-6">
          Search Results
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {movies.map((movie) => (

  <Link
    key={movie.imdbID}
    href={`/movie/${movie.imdbID}`}
  >

    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer"
    >
            
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-[320px] object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold">
                  {movie.Title}
                </h3>

                <p className="text-gray-400">
                  {movie.Year}
                </p>

              </div>

           </motion.div>

</Link>

))}

          

        </div>

      </section>

    </main>
  );
}