import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── Participation Cards Data ─────────────────────────
const PARTICIPATION = [
  {
    to: "/delegate",
    label: "Delegate",
    tag: "Free",
    tagClass: "home-tag--green",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    desc: "Apply for curated networking, startup sessions, and exclusive investor access.",
    perks: ["Curated networking", "Investor access", "Startup sessions"],
    btnLabel: "Apply as Delegate",
    btnClass: "btn-home btn-home--purple",
    accent: "card-accent--purple",
  },
  {
    to: "/exhibitor",
    label: "Exhibitor",
    tag: "Paid",
    tagClass: "home-tag--amber",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    desc: "Showcase your startup, products, and services with premium stall access.",
    perks: ["Premium stall space", "Brand visibility", "5000+ footfall"],
    btnLabel: "Become Exhibitor",
    btnClass: "btn-home btn-home--amber",
    accent: "card-accent--amber",
    highlight: true,
  },
  {
    to: "/sponsor",
    label: "Sponsor",
    tag: "Partner",
    tagClass: "home-tag--blue",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    desc: "Partner with Nexus Summit and gain premium brand visibility across all channels.",
    perks: ["Logo on all creatives", "Stage mention", "VIP lounge access"],
    btnLabel: "Sponsor Us",
    btnClass: "btn-home btn-home--blue",
    accent: "card-accent--blue",
  },
];

// ── Extra Nav Links ──────────────────────────────────
const EXTRA_LINKS = [
  { to: "/event",      label: "Event Schedule", icon: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
  { to: "/networking", label: "Networking",     icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { to: "/my-qr",      label: "My QR Pass",     icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 4h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
];

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="home-wrapper">

        {/* ── HERO ─────────────────────────────────────── */}
        <section className="home-hero">
          <div className="home-blob home-blob-1" />
          <div className="home-blob home-blob-2" />
          <div className="home-blob home-blob-3" />

          <div className="home-hero-inner">
            <div className="home-hero-badge">
              <span className="home-hero-dot" />
              Pune, India · 6 June 2026
            </div>

            <h1 className="home-hero-title">
              Nexus Link<br />
              <span className="home-hero-title-accent">Summit 2026</span>
            </h1>

            <p className="home-hero-meta">9 AM – 6 PM &nbsp;·&nbsp; Curated Networking Summit</p>
            <p className="home-hero-desc">
              India's premier platform connecting founders, investors, enterprise
              leaders, and innovators under one roof.
            </p>

            <div className="home-stats">
              {[
                { value: "5000+", label: "Attendees" },
                { value: "120+",  label: "Exhibitors" },
                { value: "80+",   label: "Speakers" },
                { value: "50+",   label: "Sponsors" },
              ].map((s) => (
                <div className="home-stat" key={s.label}>
                  <span className="home-stat-value">{s.value}</span>
                  <span className="home-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADMIN VIEW ───────────────────────────────── */}
        {user?.role === "admin" ? (
          <section className="home-section home-admin-section">
            <div className="home-section-inner">
              <div className="home-section-header">
                <span className="section-dot dot-purple" />
                <h2 className="home-section-title">Admin Control Center</h2>
              </div>
              <p className="home-section-sub">Manage the entire event from your dashboard</p>

              <div className="home-admin-cards">
                <Link to="/admin-dashboard" className="admin-action-card admin-action-card--primary">
                  <div className="admin-action-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  </div>
                  <div className="admin-action-text">
                    <p className="admin-action-label">Admin Dashboard</p>
                    <p className="admin-action-sub">Manage delegates, exhibitors & revenue</p>
                  </div>
                  <svg className="admin-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>

                <Link to="/event" className="admin-action-card">
                  <div className="admin-action-icon admin-action-icon--gray">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div className="admin-action-text">
                    <p className="admin-action-label">Event Schedule</p>
                    <p className="admin-action-sub">View and manage event timeline</p>
                  </div>
                  <svg className="admin-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

        ) : (
          <>
            {/* ── PARTICIPATION CARDS ───────────────────── */}
            <section className="home-section">
              <div className="home-section-inner">
                <div className="home-section-header">
                  <span className="section-dot dot-purple" />
                  <h2 className="home-section-title">Choose Your Participation</h2>
                </div>
                <p className="home-section-sub">
                  Join as a delegate, exhibitor, or sponsor and be part of the experience
                </p>

                <div className="home-cards-grid">
                  {PARTICIPATION.map((card) => (
                    <div
                      key={card.label}
                      className={`home-part-card ${card.highlight ? "home-part-card--highlight" : ""}`}
                    >
                      <div className={`home-card-accent ${card.accent}`} />

                      <div className="home-card-top">
                        <div className="home-card-icon">{card.icon}</div>
                        <span className={`home-tag ${card.tagClass}`}>{card.tag}</span>
                      </div>

                      <h3 className="home-card-title">{card.label}</h3>
                      <p className="home-card-desc">{card.desc}</p>

                      <ul className="home-card-perks">
                        {card.perks.map((p) => (
                          <li key={p}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {p}
                          </li>
                        ))}
                      </ul>

                      <Link to={card.to} className={card.btnClass}>
                        {card.btnLabel}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── QUICK LINKS ───────────────────────────── */}
            <section className="home-section home-quicklinks-section">
              <div className="home-section-inner">
                <div className="home-section-header">
                  <span className="section-dot dot-blue" />
                  <h2 className="home-section-title">Explore More</h2>
                </div>

                <div className="home-quicklinks">
                  {EXTRA_LINKS.map((link) => (
                    <Link to={link.to} key={link.to} className="home-quicklink">
                      <span className="home-quicklink-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={link.icon} />
                        </svg>
                      </span>
                      <span>{link.label}</span>
                      <svg className="home-quicklink-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

      </div>

      <Footer />
    </>
  );
}