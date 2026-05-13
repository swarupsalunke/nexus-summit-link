import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../index.css";

// Initials banane ka helper
const getInitials = (name = "") =>
    name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("");

// Industry ke hisaab se badge color
const industryBadge = (industry = "") => {
    const map = {
        fintech:    { bg: "#ede9fe", color: "#6d28d9" },
        healthtech: { bg: "#dbeafe", color: "#1e40af" },
        cleantech:  { bg: "#d1fae5", color: "#065f46" },
        edtech:     { bg: "#fef3c7", color: "#92400e" },
    };
    return map[industry.toLowerCase()] ?? { bg: "#ede9fe", color: "#6d28d9" };
};

export default function Networking() {

    // ======================================================
    // 🔥 STATES
    // ======================================================

    const [delegates, setDelegates] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [sending, setSending]     = useState(null); // receiverId track karta hai

    // ======================================================
    // 🔥 CURRENT USER
    // ======================================================

    const user = JSON.parse(localStorage.getItem("user"));

    // ======================================================
    // 🔥 FETCH APPROVED DELEGATES
    // ======================================================

    const fetchDelegates = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/delegate/approved",
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setDelegates(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load delegates");
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // 🔥 LOAD DATA
    // ======================================================

    useEffect(() => {
        fetchDelegates();
    }, []);

    // ======================================================
    // 🔥 CONNECT BUTTON
    // ======================================================

    const handleConnect = async (receiverId) => {
        if (!receiverId) {
            toast.error("Invalid user");
            return;
        }
        if (receiverId === user.id) {
            toast.error("You cannot connect with yourself");
            return;
        }

        setSending(receiverId);

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/connection/send",
                { receiverId },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            toast.success(data.message || "Connection request sent!");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Connection failed"
            );
        } finally {
            setSending(null);
        }
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
                    duration: 3500,
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

            <div className="net-wrapper">
                <div className="net-inner">

                    {/* 🔥 PAGE HEADER */}
                    <div className="net-hero">
                        <div className="net-eyebrow">
                            <span className="net-dot" />
                            Networking
                        </div>
                        <h1 className="net-title">Networking Directory</h1>
                        <p className="net-subtitle">
                            Connect with approved delegates attending
                            Nexus Link Summit 2026
                        </p>
                    </div>

                    {/* 🔥 LOADING */}
                    {loading ? (
                        <div className="net-loading">
                            <div className="spinner-purple" />
                            Loading delegates...
                        </div>
                    ) : (

                        /* 🔥 GRID */
                        <div className="net-grid">
                            {delegates.filter((d) => d.userId !== user.id).length > 0 ? (

                                delegates
                                    .filter((d) => d.userId !== user.id)
                                    .map((delegate) => {
                                        const badge = industryBadge(delegate.industry);
                                        return (
                                            <div key={delegate._id} className="net-card">

                                                {/* TOP ROW */}
                                                <div className="net-card-top">
                                                    <div className="net-avatar">
                                                        {getInitials(delegate.name)}
                                                    </div>
                                                    <div className="net-card-meta">
                                                        <div className="net-card-name">
                                                            {delegate.name}
                                                        </div>
                                                        <div className="net-card-company">
                                                            {delegate.company}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* INDUSTRY BADGE */}
                                                <span
                                                    className="net-badge"
                                                    style={{
                                                        background: badge.bg,
                                                        color: badge.color,
                                                    }}
                                                >
                                                    {delegate.industry}
                                                </span>

                                                {/* FIELDS */}
                                                <div className="net-card-fields">
                                                    <div className="net-field">
                                                        <svg className="net-field-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                        </svg>
                                                        <span>
                                                            <span className="net-field-label">Purpose: </span>
                                                            <span className="net-field-value">{delegate.purpose}</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* CONNECT BUTTON */}
                                                <button
                                                    className="btn-connect"
                                                    onClick={() => handleConnect(delegate.userId)}
                                                    disabled={sending === delegate.userId}
                                                >
                                                    {sending === delegate.userId ? (
                                                        <>
                                                            <span className="spinner" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                                <circle cx="9" cy="7" r="4" />
                                                                <line x1="19" y1="8" x2="19" y2="14" />
                                                                <line x1="22" y1="11" x2="16" y2="11" />
                                                            </svg>
                                                            Connect
                                                        </>
                                                    )}
                                                </button>

                                            </div>
                                        );
                                    })

                            ) : (

                                /* 🔥 EMPTY STATE */
                                <div className="net-empty">
                                    <div className="net-empty-icon">
                                        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h3 className="net-empty-title">No delegates found</h3>
                                    <p className="net-empty-sub">
                                        No approved delegates available right now.
                                        Check back later!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}