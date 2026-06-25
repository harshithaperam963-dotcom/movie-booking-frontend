export default function Hero() {
  return (
    <section className="h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">
        My Movie
      </h1>

      <p className="text-zinc-400 max-w-2xl text-xl">
        Real-time movie ticket booking with
        concurrency-safe seat reservation,
        auto timeout release and live updates.
      </p>

      <button className="mt-8 bg-red-600 px-8 py-3 rounded-xl hover:bg-red-700 transition">
        Book Tickets
      </button>
    </section>
  );
}