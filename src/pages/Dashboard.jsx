import React, { useEffect, useState } from "react";
import api from "../api";
import "../Style/Admin/Dashboard.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [treks, setTreks] = useState([]);
  const [hikes, setHikes] = useState([]);
  const [expeditions, setExpeditions] = useState([]);
  const [climbing, setClimbing] = useState([]);
  const [valleyPass, setValleyPass] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const t = await api.get("/treks");
        setTreks(t.data);

        const hk = await api.get("/hikes");
        setHikes(hk.data);

        const ex = await api.get("/expeditions");
        setExpeditions(ex.data);

        const cl = await api.get("/climbing");
        setClimbing(cl.data);

        const vp = await api.get("/valley-pass");
        setValleyPass(vp.data);

        const b = await api.get("/bookings");
        setBookings(b.data);
      } catch (err) {
        console.error("Admin Dashboard Load Error:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>Dashboard Overview</h1>
        </header>

        <section className="stats-section">
          <h2>Quick Stats</h2>

          <div className="stats-grid">

            {/* Treks */}
            <Link to="/treks" className="stat-card-link">
              <div className="stat-card">
                <h3>Total Treks</h3>
                <p className="stat-number">{treks.length}</p>
              </div>
            </Link>

            {/* Hikes */}
            <Link to="/hikes" className="stat-card-link">
              <div className="stat-card">
                <h3>Total Hikes</h3>
                <p className="stat-number">{hikes.length}</p>
              </div>
            </Link>

            {/* Expeditions */}
            <Link to="/expeditions" className="stat-card-link">
              <div className="stat-card">
                <h3>Total Expeditions</h3>
                <p className="stat-number">{expeditions.length}</p>
              </div>
            </Link>

            {/* Rock Climbing */}
            <Link to="/climbing" className="stat-card-link">
              <div className="stat-card">
                <h3>Rock Climbing</h3>
                <p className="stat-number">{climbing.length}</p>
              </div>
            </Link>

            {/* Valley Pass */}
            <Link to="/valley-pass" className="stat-card-link">
              <div className="stat-card">
                <h3>Valley Pass</h3>
                <p className="stat-number">{valleyPass.length}</p>
              </div>
            </Link>

            {/* Bookings */}
            <Link to="/bookings" className="stat-card-link">
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-number">{bookings.length}</p>
              </div>
            </Link>

          </div>
        </section>
      </main>
    </div>
  );
}
