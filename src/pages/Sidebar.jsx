import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Style/Admin/Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  const [openTreks, setOpenTreks] = useState(
    pathname.startsWith("/treks") ||
    pathname.startsWith("/hikes") ||
    pathname.startsWith("/expeditions") ||
    pathname.startsWith("/climbing")
  );

  return (
    <aside className="sidebar">
      <h2 className="logo">
        SummitTrail <br /> Admin Panel
      </h2>

      <nav className="sidebar-nav">

        {/* DASHBOARD */}
        <Link
          to="/dashboard"
          className={pathname === "/dashboard" || pathname === "/" ? "active" : ""}
        >
          Dashboard
        </Link>

        {/* TREKS GROUP */}
        <div className="menu-group">
          <div
            className="menu-group-title"
            onClick={() => setOpenTreks(!openTreks)}
          >
            <span>Treks & Adventures</span>
            <span className="arrow">{openTreks ? "▾" : "▸"}</span>
          </div>

          {openTreks && (
            <div className="submenu">
              <Link to="/treks" className={pathname.startsWith("/treks") ? "active" : ""}>Treks</Link>
              <Link to="/hikes" className={pathname.startsWith("/hikes") ? "active" : ""}>Hikes</Link>
              <Link to="/expeditions" className={pathname.startsWith("/expeditions") ? "active" : ""}>Expeditions</Link>
              <Link to="/climbing" className={pathname.startsWith("/climbing") ? "active" : ""}>Climbing</Link>
            </div>
          )}
        </div>

        {/* SIMPLE LEAD SECTION (NO GROUP, NO SUBMENU) */}
        <Link
          to="/lead"
          className={pathname.startsWith("/lead") ? "active" : ""}
        >
          Lead
        </Link>

        {/* BOOKINGS */}
        <Link
          to="/bookings"
          className={pathname.startsWith("/bookings") ? "active" : ""}
        >
          Bookings
        </Link>

      </nav>
    </aside>
  );
}
