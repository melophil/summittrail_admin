// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { Link } from 'react-router-dom';
// import "../Style/Admin/Treks.css";




// export default function Treks() {
//   const [treks, setTreks] = useState([]);

//   useEffect(() => {
//     api.get('/treks').then(r => setTreks(r.data));
//   }, []);

//   async function remove(id) {
//     if (!confirm('Delete trek?')) return;
//     await api.delete('/treks/' + id);
//     setTreks(treks.filter(t => t._id !== id));
//   }

//   return (
//     <div className="admin-page">
//       <header>
//         <h1>Treks</h1>
//         <Link to="/treks/new">+ New Trek</Link>
//       </header>

//       <div className="list">
//         {treks.map(t => (
//           <div className="list-item" key={t._id}>
            
//             {/* FIXED IMAGE HANDLING */}
//             <img 
//               src={t.image?.startsWith("http") ? t.image : `/${t.image}`} 
//               alt={t.title} 
//               width={140} 
//               style={{ borderRadius: "10px" }}
//             />

//             <div>
//               <h3>{t.title}</h3>
//               <p>{t.region} • {t.difficulty}</p>
//             </div>

//             <div className="actions">
//               <Link to={`/treks/edit/${t._id}`}>Edit</Link>
//               <button onClick={() => remove(t._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "../Style/Admin/Treks.css";
import Sidebar from "./Sidebar";
export default function Treks() {
  const [treks, setTreks] = useState([]);

  useEffect(() => {
    api.get("/treks").then((r) => setTreks(r.data));
  }, []);

  async function remove(id) {
    if (!confirm("Delete this trek?")) return;
    await api.delete("/treks/" + id);
    setTreks(treks.filter((t) => t._id !== id));
  }

  return (
    <div className="admin-container">
      {/* Sidebar (same layout as Dashboard) */}
     <Sidebar />

      {/* Main Content */}
      <main className="content">
        <header className="content-header">
          <h1>Manage Treks</h1>
          <Link className="btn-primary" to="/treks/new">
            + Add New Trek
          </Link>
        </header>

        <div className="trek-grid">
          {treks.map((t) => (
            <div className="trek-card" key={t._id}>
              <img
                src={
                  t.image?.startsWith("http") ? t.image : `/${t.image}`
                }
                alt={t.title}
                className="trek-image"
              />

              <div className="trek-info">
                <h3>{t.title}</h3>
                <p className="muted">
                  {t.region} • {t.difficulty}
                </p>
              </div>

              <div className="trek-actions">
                <Link className="btn-edit" to={`/treks/edit/${t._id}`}>
                  Edit
                </Link>
                <button className="btn-delete" onClick={() => remove(t._id)}>
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
