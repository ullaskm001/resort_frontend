
import React, { useState } from "react";
import banner from "../assets/banner-image.jpg";
// ...existing code...

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "Standard",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");
  setSuccessMsg("");
  setLoading(true);

  try {
    const res = await fetch("${import.meta.env.VITE_API_URL}/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to save booking");
    }

    setSuccessMsg("Booking saved successfully.");
    setForm({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      roomType: "Standard",
    });
    setTimeout(() => setOpen(false), 1000);
  } catch (err) {
    setErrorMsg(err.message);
  } finally {
    setLoading(false);
  }
};


 return (
  <div className="relative">
    {/* Background Image */}
    <img
      src={banner}
      alt="Banner"
      className="h-[60vh] md:h-screen w-full object-cover"
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Hero Text */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-sans">
        Resort Booking System
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl mt-2 font-semibold">
        Book Your Resorts Easily.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-800 px-6 py-2 sm:px-10 sm:py-3 rounded-3xl mt-5 hover:bg-green-900 text-sm sm:text-base"
      >
        Book Now
      </button>
    </div>

    {/* Modal */}
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => !loading && setOpen(false)}
        />

        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-lg p-6 w-full max-w-lg z-10"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            Book a Room
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-3">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="border p-2 rounded text-sm"
            />

            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded text-sm"
            />

            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded text-sm"
            />

            {/* Date Fields */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                required
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
              <input
                required
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            {/* Guests & Room Type */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                required
                type="number"
                name="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />

              <select
                name="roomType"
                value={form.roomType}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              >
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>
          </div>

          {/* Messages */}
          {errorMsg && <p className="text-red-600 mt-3 text-center">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 mt-3 text-center">{successMsg}</p>}

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded border text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800 text-sm"
            >
              {loading ? "Saving..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
);

};

export default HeroSection;
// ...existing code...