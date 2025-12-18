import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/Dashboard.css"; // ✅ card-based CSS

export default function ExpeditionList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/expeditions");
    setItems(res.data);
  }

  async function remove(id) {
    if (!window.confirm("Delete this expedition?")) return;
    await api.delete(`/expeditions/${id}`);
    load();
  }

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>Expeditions</h1>
          <Link to="/expeditions/new" className="btn-primary">
            + Add Expedition
          </Link>
        </header>

        {/* CARD GRID */}
        <div className="trek-grid">
          {items.map((exp) => (
            <div className="trek-card" key={exp._id}>

              <img
                src={exp.image}
                alt={exp.title}
                className="trek-image"
              />

              <div className="trek-info">
                <h3>{exp.title}</h3>
                <p className="muted">Country: {exp.country}</p>
                <p className="muted">Difficulty: {exp.difficulty}</p>
                <p className="muted">Duration: {exp.durationDays} days</p>
              </div>

              <div className="trek-actions">
                <Link
                  to={`/expeditions/edit/${exp._id}`}
                  className="btn-edit"
                >
                  Edit
                </Link>

                <button
                  className="btn-delete"
                  onClick={() => remove(exp._id)}
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
