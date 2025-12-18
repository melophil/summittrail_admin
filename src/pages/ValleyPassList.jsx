import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/Dashboard.css"; // ✅ use unified card CSS

export default function ValleyPassList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/valley-pass");
    setItems(res.data);
  }

  async function remove(id) {
    if (!window.confirm("Delete this valley pass?")) return;
    await api.delete(`/valley-pass/${id}`);
    load();
  }

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>Valley Pass</h1>
          <Link to="/valley-pass/new" className="btn-primary">
            + Add Valley Pass
          </Link>
        </header>

        {/* CARD GRID */}
        <div className="trek-grid">
          {items.map((pass) => (
            <div className="trek-card" key={pass._id}>

              <img
                src={pass.image}
                alt={pass.title}
                className="trek-image"
              />

              <div className="trek-info">
                <h3>{pass.title}</h3>
                <p className="muted">Region: {pass.region}</p>
                <p className="muted">Best Season: {pass.bestSeason}</p>
                <p className="muted">Price: ₹{pass.pricePerPerson}</p>
              </div>

              <div className="trek-actions">
                <Link
                  to={`/valley-pass/edit/${pass._id}`}
                  className="btn-edit"
                >
                  Edit
                </Link>

                <button
                  onClick={() => remove(pass._id)}
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
