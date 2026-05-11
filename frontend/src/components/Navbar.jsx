import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  // ======================================================
  // 🔥 STATE
  // ======================================================

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // ======================================================
  // 🔥 CURRENT USER
  // ======================================================

  const user = JSON.parse(localStorage.getItem("user"));

  // ======================================================
  // 🔥 LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ======================================================
  // 🔥 ACTIVE LINK CHECK
  // ======================================================

  const isActive = (path) => location.pathname === path;

  // ======================================================
  // 🔥 AVATAR INITIALS
  // ======================================================

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // ======================================================
  // 🔥 NAV LINKS
  // ======================================================

  const adminLinks = [
    { to: "/home",            label: "Home" },
    { to: "/admin-dashboard", label: "Dashboard" },
    { to: "/event",           label: "Event" },
  ];

  const userLinks = [
    { to: "/home",                label: "Home" },
    { to: "/connection-requests", label: "Requests" },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  // ======================================================
  // 🔥 UI
  // ======================================================

  return (
    <nav className="navbar">

      {/* ── Inner ───────────────────────────────────────── */}
      <div className="navbar-inner">

        {/* ── Brand ─────────────────────────────────────── */}
        <Link to="/home" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <div className="navbar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="navbar-brand-name">Nexus Summit</span>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────── */}
        <div className="navbar-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${isActive(link.to) ? "navbar-link--active" : ""}`}
            >
              {link.label}
              {isActive(link.to) && <span className="navbar-link-dot" />}
            </Link>
          ))}
        </div>

        {/* ── Right Actions ─────────────────────────────── */}
        <div className="navbar-actions">

          {user && (
            <div className="navbar-user-group">

              {/* Avatar + Name */}
              <div className="navbar-user-info">
                <div className="navbar-avatar">
                  {getInitials(user.name || user.email || "U")}
                </div>
                <div className="navbar-user-text">
                  <span className="navbar-user-name">
                    {user.name || user.email?.split("@")[0] || "User"}
                  </span>
                  {user.role && (
                    <span className="navbar-user-role">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="navbar-user-divider" />

              {/* Logout */}
              <button className="navbar-logout-btn" onClick={handleLogout}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>

            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            className={`navbar-hamburger ${menuOpen ? "navbar-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>

      </div>

      {/* ── Mobile Drawer ─────────────────────────────── */}
      <div className={`navbar-drawer ${menuOpen ? "navbar-drawer--open" : ""}`}>
        <div className="navbar-drawer-inner">

          {/* Mobile User Info Card */}
          {user && (
            <div className="navbar-drawer-user">
              <div className="navbar-avatar navbar-avatar--lg">
                {getInitials(user.name || user.email || "U")}
              </div>
              <div>
                <div className="navbar-drawer-user-name">
                  {user.name || user.email?.split("@")[0] || "User"}
                </div>
                {user.role && (
                  <div className="navbar-drawer-user-role">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Nav Links */}
          <div className="navbar-drawer-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-drawer-link ${isActive(link.to) ? "navbar-drawer-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Logout */}
          {user && (
            <button className="navbar-drawer-logout" onClick={handleLogout}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          )}

        </div>
      </div>

    </nav>
  );
}