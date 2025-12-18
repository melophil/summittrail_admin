import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

import "../Style/Admin/TrekForm.css";

export default function ValleyPassForm() {
  const [form, setForm] = useState({
    title: "",
    region: "",
    description: "",
    bestSeason: "",
    pricePerPerson: "",
    image: "",
    featured: false,
  });

  const [uploading, setUploading] = useState(false);
  const nav = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      api.get(`/valley-pass/${params.id}`).then((res) => setForm(res.data));
    }
  }, [params.id]);

  async function submit(e) {
    e.preventDefault();
    if (params.id) {
      await api.put(`/valley-pass/${params.id}`, form);
    } else {
      await api.post("/valley-pass", form);
    }
    nav("/valley-pass");
  }

  async function uploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await api.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, image: res.data.url });
    } catch {
      alert("Image upload failed");
    }

    setUploading(false);
  }

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="content">
        <header className="content-header">
          <h1>{params.id ? "Edit Valley Pass" : "Create Valley Pass"}</h1>
        </header>

        <form onSubmit={submit} className="trek-form">
          {/* LEFT */}
          <div className="form-left">
            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label>Region</label>
            <input
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
            />

            <label>Best Season</label>
            <input
              value={form.bestSeason}
              onChange={(e) =>
                setForm({ ...form, bestSeason: e.target.value })
              }
              placeholder="Mar – Jun"
            />

            <label>Price Per Person</label>
            <input
              type="number"
              value={form.pricePerPerson}
              onChange={(e) =>
                setForm({ ...form, pricePerPerson: e.target.value })
              }
            />
          </div>

          {/* RIGHT */}
          <div className="form-right">
            <label>Description</label>
            <textarea
              rows="6"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label>Image URL</label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={uploadImage} />
            {uploading && <p className="uploading">Uploading...</p>}

            {form.image && (
              <img src={form.image} alt="Preview" className="preview-img" />
            )}

            <label className="featured-box">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              <span>Feature this valley pass</span>
            </label>
          </div>
        </form>

        <button type="submit" onClick={submit} className="save-btn">
          Save Valley Pass
        </button>
      </main>
    </div>
  );
}
