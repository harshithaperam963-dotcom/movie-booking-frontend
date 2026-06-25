export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
      <h1 className="text-3xl font-bold text-red-500">
        My Movie
      </h1>

      <div className="flex gap-8">
        <button className="hover:text-red-500 transition">
          Movies
        </button>

        <button className="hover:text-red-500 transition">
          Theatres
        </button>

        <button className="hover:text-red-500 transition">
          My Bookings
        </button>
      </div>
    </nav>
  );
}