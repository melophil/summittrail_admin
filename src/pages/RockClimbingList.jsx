import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/ListPage.css";

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
          <Link to="/climbing/new" className="create-btn">
            + Add Rock Climbing
          </Link>
        </header>

        <div className="list-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((c) => (
                <tr key={c._id}>
                  <td>
                    <img src={c.image} alt="" className="thumb" />
                  </td>
                  <td>{c.title}</td>
                  <td>{c.location}</td>
                  <td>{c.difficulty}</td>
                  <td>{c.duration}</td>

                  <td className="actions">
                    <Link
                      to={`/climbing/edit/${c._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => remove(c._id)}
                      className="delete-btn"
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
