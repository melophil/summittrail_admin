import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/Dashboard.css"; // ✅ use card CSS

export default function RockClimbingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/climbing");
    setItems(res.data);
  }

  async function remove(id) {
    if (!window.confirm("Delete this rock climbing activity?")) return;
    await api.delete(`/climbing/${id}`);
    load();
  }

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>Rock Climbing</h1>
          <Link to="/climbing/new" className="btn-primary">
            + Add Rock Climbing
          </Link>
        </header>

        {/* CARD GRID */}
        <div className="trek-grid">
          {items.map((climb) => (
            <div className="trek-card" key={climb._id}>

              <img
                src={climb.image}
                alt={climb.title}
                className="trek-image"
              />

              <div className="trek-info">
                <h3>{climb.title}</h3>
                <p className="muted">Location: {climb.location}</p>
                <p className="muted">Difficulty: {climb.difficulty}</p>
                <p className="muted">Duration: {climb.duration}</p>
              </div>

              <div className="trek-actions">
                <Link
                  to={`/climbing/edit/${climb._id}`}
                  className="btn-edit"
                >
                  Edit
                </Link>

                <button
                  onClick={() => remove(climb._id)}
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
