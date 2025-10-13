'use client';
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-lg mb-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📘 Personal Task Tracker</h1>
        <p className="text-sm opacity-90">Stay on top of your goals</p>
      </div>
    </nav>
  );
}
