"use client";

import { Suspense, useEffect, useState } from "react";

import {
  getSeats,
  reserveSeats,
} from "@/services/seatService";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { socket } from "@/services/socket";



interface Seat {
  id: string;
  seatNumber: string;
  rowNumber: string;
  isBooked: boolean;
}

function SeatsContent()  {
  const [seats, setSeats] =
    useState<Seat[]>([]);

  const [selectedSeats,
  setSelectedSeats] =
    useState<string[]>([]);

  useEffect(() => {
    const fetchSeats =
      async () => {
        try {
          const data =
  await getSeats(movieId);

          setSeats(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchSeats();
  }, []);

  useEffect(() => {
  socket.on(
    "seatReserved",
    ({ seatIds }) => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => ({
          ...seat,
          isBooked:
            seat.isBooked ||
            seatIds.includes(
              seat.id
            ),
        }))
      );
    }
  );

  return () => {
    socket.off(
      "seatReserved"
    );
  };
}, []);
 const router = useRouter();

const searchParams = useSearchParams();

const movie =
  searchParams.get("movie") || "";

const movieId =
  searchParams.get("movieId") || "";

console.log("Movie ID:", movieId);

const theatreId =
  searchParams.get("theatre") || "";

  const toggleSeat = (
    seatId: string
  ) => {
    if (
      selectedSeats.includes(
        seatId
      )
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          (id) =>
            id !== seatId
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seatId,
      ]);
    }
  };

 const handleReserve = async () => {
  try {
    const data =
  await reserveSeats(
    selectedSeats,
    movieId,
    theatreId
  );

    console.log(data);

    router.push(
      `/checkout?movie=${encodeURIComponent(
        movie
      )}`
    );

  } catch (error: any) {
  console.log(error);

  alert(
    JSON.stringify(
      error?.response?.data ||
      error?.message ||
      error
    )
  );
}
};

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Select Seats
      </h1>

      <div className="text-center mb-10">

        <div className="w-full h-4 bg-white rounded-full mb-2" />

        <p>SCREEN</p>

      </div>

      <div className="max-w-4xl mx-auto">

        <div className="flex flex-wrap justify-center gap-3">

          {seats.map((seat) => (

            <button
              key={seat.id}
              disabled={seat.isBooked}
              onClick={() =>
                toggleSeat(
                  seat.id
                )
              }
            className={`
  w-14 h-14 rounded-lg
  ${
    seat.isBooked
      ? "bg-red-600 cursor-not-allowed"
      : selectedSeats.includes(
          seat.id
        )
      ? "bg-green-500"
      : "bg-zinc-800"
  }
`}
            >
              {seat.seatNumber}
            </button>

          ))}

        </div>

      </div>

      <div className="text-center mt-10">

        <h2 className="text-2xl mb-4">
          Selected Seats
        </h2>

        <p>
          {selectedSeats.length}
          {" "}
          Seat(s) Selected
        </p>

        <div className="mt-6">

          <button
            onClick={
              handleReserve
            }
            disabled={
              selectedSeats.length === 0
            }
            className="
              bg-red-600
              px-8
              py-3
              rounded-xl
              disabled:opacity-50
            "
          >
            Reserve Seats
          </button>

        </div>

      </div>

    </main>
  );
}
  


export default function SeatsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SeatsContent />
    </Suspense>
  );
}