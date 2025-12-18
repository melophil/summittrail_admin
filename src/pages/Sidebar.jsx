import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Style/Admin/Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openTreks, setOpenTreks] = useState(
    pathname.startsWith("/treks") ||
    pathname.startsWith("/hikes") ||
    pathname.startsWith("/expeditions") ||
    pathname.startsWith("/climbing")
  );

  return (
    <>
      {/* TOGGLE BUTTON (Mobile / Tablet) */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* OVERLAY */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="logo">
          SummitTrail <br /> Admin Panel
        </h2>

        {/* Close button inside sidebar */}
        <button
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <nav className="sidebar-nav">

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
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
                <Link
                  to="/treks"
                  onClick={() => setSidebarOpen(false)}
                  className={pathname.startsWith("/treks") ? "active" : ""}
                >
                  Treks
                </Link>

                <Link
                  to="/hikes"
                  onClick={() => setSidebarOpen(false)}
                  className={pathname.startsWith("/hikes") ? "active" : ""}
                >
                  Hikes
                </Link>

                <Link
                  to="/expeditions"
                  onClick={() => setSidebarOpen(false)}
                  className={pathname.startsWith("/expeditions") ? "active" : ""}
                >
                  Expeditions
                </Link>

                <Link
                  to="/climbing"
                  onClick={() => setSidebarOpen(false)}
                  className={pathname.startsWith("/climbing") ? "active" : ""}
                >
                  Climbing
                </Link>
              </div>
            )}
          </div>

          {/* LEAD */}
          <Link
            to="/lead"
            onClick={() => setSidebarOpen(false)}
            className={pathname.startsWith("/lead") ? "active" : ""}
          >
            Lead
          </Link>

          {/* BOOKINGS */}
          <Link
            to="/bookings"
            onClick={() => setSidebarOpen(false)}
            className={pathname.startsWith("/bookings") ? "active" : ""}
          >
            Bookings
          </Link>

        </nav>
      </aside>
    </>
  );
}
