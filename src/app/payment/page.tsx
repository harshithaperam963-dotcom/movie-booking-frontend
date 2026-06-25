"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] =
    useState(120);
useEffect(() => {
  if (timeLeft === 0) {
    alert("Reservation Expired!");
    router.push("/");
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [timeLeft, router]);

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds =
    timeLeft % 60;

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Payment
      </h1>

      <div className="bg-zinc-900 p-8 rounded-xl max-w-lg">

        <h2 className="text-2xl mb-4">
          Amount: ₹600
        </h2>

        <div className="mb-6">

          <h3 className="text-xl text-red-500 font-bold">
            Time Remaining:
          </h3>

          <p className="text-4xl font-bold mt-2">
            {String(minutes).padStart(
              2,
              "0"
            )}
            :
            {String(seconds).padStart(
              2,
              "0"
            )}
          </p>

        </div>

        <button
          onClick={() =>
            router.push(
              "/success"
            )
          }
          className="
            bg-green-600
            px-8
            py-3
            rounded-xl
          "
        >
          Pay Now
        </button>

      </div>

    </main>
  );
}