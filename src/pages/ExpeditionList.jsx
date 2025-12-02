import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/ListPage.css";

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
          <Link to="/expeditions/new" className="create-btn">
            + Add Expedition
          </Link>
        </header>

        <div className="list-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Country</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((e) => (
                <tr key={e._id}>
                  <td>
                    <img src={e.image} alt="" className="thumb" />
                  </td>
                  <td>{e.title}</td>
                  <td>{e.country}</td>
                  <td>{e.difficulty}</td>
                  <td>{e.durationDays} days</td>

                  <td className="actions">
                    <Link
                      to={`/expeditions/edit/${e._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => remove(e._id)}
                    >
                      Delete
                    </button>
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
