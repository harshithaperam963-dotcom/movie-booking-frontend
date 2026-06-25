"use client";

import { useSearchParams }
from "next/navigation";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {

  const searchParams =
    useSearchParams();

  const router = useRouter();  

  const movie =
    searchParams.get("movie");

  const seatCount = 3;

  const total =
    seatCount * 200;

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Booking Summary
      </h1>

      <div className="bg-zinc-900 p-8 rounded-xl max-w-xl">

        <h2 className="text-2xl mb-4">
          {movie}
        </h2>

        <p>
          Theatre:
          PVR Vijayawada
        </p>

        <p>
          Seats:
          Reserved Successfully
        </p>

        <p>
          Price:
          ₹300 × Selected Seats
        </p>

        <h3 className="text-3xl mt-6 font-bold">
          Total: ₹{total}
        </h3>

      <button
  onClick={() =>
    router.push("/payment")
  }
  className="
    mt-6
    bg-green-600
    px-8
    py-3
    rounded-xl
  "
>
  Proceed To Payment
</button>

      </div>

    </main>
  );
}