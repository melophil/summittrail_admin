import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/Dashboard.css"; // ✅ use card CSS

export default function HikeList() {
  const [items, setItems] = useState([]);

  /* Load all hikes */
  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/hikes");
    setItems(res.data);
  }

  async function remove(id) {
    if (!window.confirm("Delete this hike?")) return;
    await api.delete(`/hikes/${id}`);
    load();
  }

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>Hikes</h1>
          <Link to="/hikes/new" className="btn-primary">
            + Add Hike
          </Link>
        </header>

        {/* CARD GRID */}
        <div className="trek-grid">
          {items.map((hike) => (
            <div className="trek-card" key={hike._id}>
              
              <img
                src={hike.image}
                alt={hike.title}
                className="trek-image"
              />

              <div className="trek-info">
                <h3>{hike.title}</h3>
                <p className="muted">Region: {hike.region}</p>
                <p className="muted">Difficulty: {hike.difficulty}</p>
                <p className="muted">Duration: {hike.durationDays} days</p>
              </div>

              <div className="trek-actions">
                <Link
                  to={`/hikes/edit/${hike._id}`}
                  className="btn-edit"
                >
                  Edit
                </Link>

                <button
                  onClick={() => remove(hike._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
