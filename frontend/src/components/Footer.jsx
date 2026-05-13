import { Link } from "react-router-dom";
import "../index.css";

export default function Footer() {
    return (
        <footer className="footer">

            {/* ── TOP ACCENT LINE ── */}
            <div className="footer-divider-top" />

            <div className="footer-inner">
                <div className="footer-grid">

                    {/* ================================================== */}
                    {/* 🔥 BRAND */}
                    {/* ================================================== */}

                    <div>
                        <div className="footer-logo-row">
                            <div className="footer-logo-icon">
                                <svg width="18" height="18" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                            <span className="footer-brand-name">Nexus Link Summit</span>
                        </div>

                        <p className="footer-brand-desc">
                            Connecting startups, investors, exhibitors,
                            and innovators under one summit.
                        </p>

                        <div className="footer-badge">
                            <span className="footer-badge-dot" />
                            Registrations Open
                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* 🔥 QUICK LINKS */}
                    {/* ================================================== */}

                    <div>
                        <div className="footer-col-label">Quick Links</div>
                        <div className="footer-links">

                            <Link to="/home" className="footer-link">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Home
                            </Link>

                            <Link to="/event" className="footer-link">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Event Schedule
                            </Link>

                            <Link to="/networking" className="footer-link">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Networking
                            </Link>

                            <Link to="/exhibitor" className="footer-link">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                Become Exhibitor
                            </Link>

                            <Link to="/delegate" className="footer-link">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <line x1="19" y1="8" x2="19" y2="14" />
                                    <line x1="22" y1="11" x2="16" y2="11" />
                                </svg>
                                Be a Delegate
                            </Link>

                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* 🔥 EVENT INFO */}
                    {/* ================================================== */}

                    <div>
                        <div className="footer-col-label">Event Info</div>
                        <div className="footer-info-items">

                            <div className="footer-info-item">
                                <div className="footer-info-icon">
                                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                Pune, Maharashtra, India
                            </div>

                            <div className="footer-info-item">
                                <div className="footer-info-icon">
                                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                                6 June 2026
                            </div>

                            <div className="footer-info-item">
                                <div className="footer-info-icon">
                                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                9:00 AM – 6:00 PM
                            </div>

                        </div>
                    </div>

                </div>

                {/* ── BOTTOM BAR ── */}
                <div className="footer-bottom">
                    <span className="footer-copy">
                        © 2026 Nexus Link Summit. All rights reserved.
                    </span>
                    <div className="footer-bottom-links">
                        <span className="footer-bottom-link">Privacy Policy</span>
                        <span className="footer-bottom-link">Terms of Use</span>
                        <span className="footer-bottom-link">Contact</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}