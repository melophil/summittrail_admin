import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/ListPage.css";

export default function HikeList() {
  const [items, setItems] = useState([]);

  // Load all hikes
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
    load(); // refresh
  }

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>Hikes</h1>
          <Link to="/hikes/new" className="create-btn">+ Add Hike</Link>

        </header>

        <div className="list-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Region</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((h) => (
                <tr key={h._id}>
                  <td>
                    <img src={h.image} alt="" className="thumb" />
                  </td>
                  <td>{h.title}</td>
                  <td>{h.region}</td>
                  <td>{h.difficulty}</td>
                  <td>{h.durationDays} days</td>

                  <td className="actions">
                    <Link to={`/hikes/edit/${h._id}`} className="edit-btn">Edit</Link>

                    <button onClick={() => remove(h._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </main>
    </div>
  );
}
