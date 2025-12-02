import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

import "../Style/Admin/TrekForm.css";

export default function ExpeditionForm() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    country: "",
    peakHeight: "",
    durationDays: 5,
    difficulty: "Moderate",
    bestSeason: [],
    description: "",
    image: "",
    featured: false
  });

  const [uploading, setUploading] = useState(false);
  const nav = useNavigate();
  const params = useParams();

  // Load for editing
  useEffect(() => {
    if (params.id) {
      api.get(`/expeditions/${params.id}`).then((res) => setForm(res.data));
    }
  }, [params.id]);

  async function submit(e) {
    e.preventDefault();
    if (params.id) {
      await api.put(`/expeditions/${params.id}`, form);
    } else {
      await api.post("/expeditions", form);
    }
    nav("/expeditions");
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
          <h1>{params.id ? "Edit Expedition" : "Create New Expedition"}</h1>
        </header>

        <form onSubmit={submit} className="trek-form">

          {/* LEFT PANEL */}
          <div className="form-left">

            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label>Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />

            <label>Country</label>
            <input
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            <label>Peak Height (m)</label>
            <input
              value={form.peakHeight}
              onChange={(e) =>
                setForm({ ...form, peakHeight: e.target.value })
              }
            />

            <label>Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            >
              <option>Easy</option>
              <option>Moderate</option>
              <option>Hard</option>
            </select>

            <label>Duration (Days)</label>
            <input
              type="number"
              value={form.durationDays}
              onChange={(e) =>
                setForm({ ...form, durationDays: e.target.value })
              }
            />

          </div>

          {/* RIGHT PANEL */}
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
              placeholder="Paste Cloudinary link"
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
              <span>Feature this expedition</span>
            </label>

          </div>

        </form>

        <button type="submit" onClick={submit} className="save-btn">
          Save Expedition
        </button>
      </main>
    </div>
  );
}
