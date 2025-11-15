import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("${import.meta.env.VITE_API_URL}/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">All Bookings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bookings.map((booking) => (
          <div key={booking._id} className="p-5 shadow-lg rounded-lg border">
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Check-in:</strong> {booking.checkIn}</p>
            <p><strong>Check-out:</strong> {booking.checkOut}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
