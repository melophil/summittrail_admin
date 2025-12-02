import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../api";
import { Link } from "react-router-dom";
import "../Style/Admin/Leads.css";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get("/leads").then((res) => setLeads(res.data));
  }, []);

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="content">

        <header className="content-header">
          <h1>All Leads</h1>
        </header>

        <div className="lead-list">

          {leads.length === 0 && <p>No leads found.</p>}

          {leads.map((l) => (
            <Link to={`/lead/${l._id}`} key={l._id} className="lead-row">

              <div>
                <h3>{l.name}</h3>
                <p className="muted">{l.email} • {l.phone}</p>
              </div>

              <div className="lead-status">
                <span className={`status-badge ${l.status || "new"}`}>
                  {l.status || "New"}
                </span>
              </div>

            </Link>
          ))}

        </div>

      </main>
    </div>
  );
}
