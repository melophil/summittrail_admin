import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../Style/Admin/LeadForm.css";

export default function LeadForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    api.get(`/leads/${id}`).then((res) => setLead(res.data));
  }, [id]);

  if (!lead) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      
      <Sidebar />

      <main className="content">

        <header className="content-header">
          <h1>Lead Details</h1>
        </header>

        <div className="lead-form">

          <label>Name</label>
          <input value={lead.name} readOnly />

          <label>Email</label>
          <input value={lead.email} readOnly />

          <label>Phone</label>
          <input value={lead.phone} readOnly />

          <label>Status</label>
          <input value={lead.status} readOnly />

          <label>Message / Notes</label>
          <textarea value={lead.message || ""} rows="4" readOnly />

          <button className="back-btn" onClick={() => navigate("/lead")}>
            Back to Leads
          </button>

        </div>

      </main>

    </div>
  );
}
