import { useRef } from "react";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../index.css";

// Initials helper
const getInitials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

export default function QRCodePage() {

    // ======================================================
    // 🔥 CURRENT USER
    // ======================================================

    const user = JSON.parse(localStorage.getItem("user"));

    const qrRef = useRef(null);

    // ======================================================
    // 🔥 QR DATA
    // ======================================================

    const qrData = JSON.stringify({
        id:    user?.id,
        name:  user?.name,
        email: user?.email,
        role:  user?.role,
        event: "Nexus Link Summit 2026",
    });

    // ======================================================
    // 🔥 DOWNLOAD QR
    // ======================================================

    const handleDownload = () => {
        try {
            const svg = qrRef.current?.querySelector("svg");
            if (!svg) return;

            const svgData   = new XMLSerializer().serializeToString(svg);
            const svgBlob   = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url       = URL.createObjectURL(svgBlob);
            const link      = document.createElement("a");
            link.href       = url;
            link.download   = `qr-${user?.name || "entry"}.svg`;
            link.click();
            URL.revokeObjectURL(url);

            toast.success("QR code downloaded!");
        } catch {
            toast.error("Download failed. Please try again.");
        }
    };

    // ======================================================
    // 🔥 PRINT QR
    // ======================================================

    const handlePrint = () => {
        window.print();
        toast.success("Print dialog opened!");
    };

    // ======================================================
    // 🔥 UI
    // ======================================================

    return (
        <>
            {/* 🔥 TOAST */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem",
                        borderRadius: "10px",
                        boxShadow: "0 4px 20px rgba(124,58,237,0.12)",
                    },
                    success: {
                        iconTheme: { primary: "#7c3aed", secondary: "#fff" },
                    },
                }}
            />

            {/* 🔥 NAVBAR */}
            <Navbar />

            <div className="qr-wrapper">
                <div className="qr-card">

                    {/* ── HEADER ── */}
                    <div className="qr-card-header">
                        <div className="qr-header-label">Event Entry Pass</div>
                        <div className="qr-header-title">Nexus Link Summit 2026</div>
                        <div className="qr-header-sub">Scan at the entry gate for access</div>
                        <div className="qr-header-dots">
                            <span className="qr-header-dot qr-header-dot--active" />
                            <span className="qr-header-dot" />
                            <span className="qr-header-dot" />
                        </div>
                    </div>

                    {/* ── BODY ── */}
                    <div className="qr-body">

                        {/* QR CODE */}
                        <div className="qr-box" ref={qrRef}>
                            <span className="qr-corner qr-corner--tl" />
                            <span className="qr-corner qr-corner--tr" />
                            <span className="qr-corner qr-corner--bl" />
                            <span className="qr-corner qr-corner--br" />
                            <QRCode
                                value={qrData}
                                size={190}
                                fgColor="#7c3aed"
                                bgColor="transparent"
                            />
                        </div>

                        {/* USER INFO */}
                        <div className="qr-user-section">
                            <div className="qr-avatar">
                                {getInitials(user?.name)}
                            </div>
                            <div>
                                <div className="qr-user-name">{user?.name}</div>
                                <div className="qr-user-email">{user?.email}</div>
                            </div>
                        </div>

                        {/* ROLE + STATUS PILLS */}
                        <div className="qr-meta-row">
                            <span className="qr-meta-pill pill-role">
                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                {user?.role}
                            </span>
                            <span className="qr-meta-pill pill-status">
                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Approved
                            </span>
                        </div>

                        {/* HINT */}
                        <div className="qr-hint">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            Show this QR code at the event entry gate
                        </div>

                    </div>

                    {/* ── FOOTER BUTTONS ── */}
                    <div className="qr-footer">
                        <button className="qr-btn qr-btn--outline" onClick={handlePrint}>
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="6 9 6 2 18 2 18 9" />
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                <rect x="6" y="14" width="12" height="8" />
                            </svg>
                            Print
                        </button>
                        <button className="qr-btn qr-btn--primary" onClick={handleDownload}>
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}