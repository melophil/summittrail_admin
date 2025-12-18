import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "../Style/Admin/ListPage.css";

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
          <Link to="/valley-pass/new" className="create-btn">
            + Add Valley Pass
          </Link>
        </header>

        <div className="list-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Region</th>
                <th>Best Season</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((v) => (
                <tr key={v._id}>
                  <td>
                    <img src={v.image} alt="" className="thumb" />
                  </td>
                  <td>{v.title}</td>
                  <td>{v.region}</td>
                  <td>{v.bestSeason}</td>
                  <td>₹{v.pricePerPerson}</td>

                  <td className="actions">
                    <Link
                      to={`/valley-pass/edit/${v._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => remove(v._id)}
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
