export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-xl text-center">

        <h1 className="text-5xl font-bold text-green-500 mb-4">
          Booking Confirmed 🎉
        </h1>

        <p className="text-xl mb-6">
          Your movie ticket has been booked successfully.
        </p>

        <p>
          Enjoy your show!
        </p>

      </div>

    </main>
  );
}