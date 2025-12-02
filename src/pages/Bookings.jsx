// import React, { useEffect, useState } from "react";
// import api from "../api";

// import "../Style/Admin/Bookings.css";

// export default function Bookings() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     api.get("/bookings").then((res) => setBookings(res.data));
//   }, []);

//   function updateStatus(id, status) {
//     api.put("/bookings/" + id, { status }).then((res) => {
//       setBookings(bookings.map(b => b._id === id ? res.data : b));
//     });
//   }

//   return (
//     <div className="admin-page">
//       <h1>Bookings</h1>

//       {bookings.map((b) => (
//         <div key={b._id} className="booking-card">
//           <h3>{b.trekTitle}</h3>
//           <p><b>Name:</b> {b.name}</p>
//           <p><b>Email:</b> {b.email}</p>
//           <p><b>Phone:</b> {b.phone}</p>
//           <p><b>People:</b> {b.numberOfPeople}</p>
//           <p><b>Date:</b> {b.date}</p>
//           <p><b>Status:</b> {b.status}</p>

//           <button onClick={() => updateStatus(b._id, "approved")}>
//             Approve
//           </button>

//           <button onClick={() => updateStatus(b._id, "rejected")}>
//             Reject
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "../Style/Admin/Bookings.css";
import Sidebar from "./Sidebar";
export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings").then((res) => setBookings(res.data));
  }, []);

  function updateStatus(id, status) {
    api.put("/bookings/" + id, { status }).then((res) => {
      setBookings(bookings.map((b) => (b._id === id ? res.data : b)));
    });
  }

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
     
      <Sidebar />
      {/* MAIN CONTENT */}
      <main className="content">
        <header className="content-header">
          <h1>Manage Bookings</h1>
        </header>

        <div className="booking-grid">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="booking-header">
                <h2>{b.trekTitle}</h2>
                <span
                  className={
                    "status-badge " +
                    (b.status === "approved"
                      ? "approved"
                      : b.status === "rejected"
                      ? "rejected"
                      : "pending")
                  }
                >
                  {b.status}
                </span>
              </div>

              <div className="booking-info">
                <p><strong>Name:</strong> {b.name}</p>
                <p><strong>Email:</strong> {b.email}</p>
                <p><strong>Phone:</strong> {b.phone}</p>
                <p><strong>People:</strong> {b.numberOfPeople}</p>
                <p><strong>Date:</strong> {b.date}</p>
              </div>

              <div className="booking-actions">
                <button
                  className="btn-approve"
                  onClick={() => updateStatus(b._id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="btn-reject"
                  onClick={() => updateStatus(b._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
