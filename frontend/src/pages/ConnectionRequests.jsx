import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function ConnectionRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const authHeader = { Authorization: `Bearer ${user?.token}` };

  // ── Fetch Requests ───────────────────────────────────
  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/connection/my-requests",
        { headers: authHeader }
      );
      setRequests(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  // ── Update Status ────────────────────────────────────
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    const toastId = toast.loading(
      status === "accepted" ? "Accepting request..." : "Rejecting request..."
    );
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/connection/${id}`,
        { status },
        { headers: authHeader }
      );
      toast.success(data.message || `Request ${status}`, { id: toastId });
      fetchRequests();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed", { id: toastId });
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Avatar initials helper ───────────────────────────
  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  // ── Role badge color ─────────────────────────────────
  const roleBadgeClass = (role) => {
    const map = {
      admin:     "badge badge-purple",
      delegate:  "badge badge-success",
      exhibitor: "badge badge-warning",
      sponsor:   "badge badge-gray",
    };
    return map[role?.toLowerCase()] || "badge badge-gray";
  };

  // ── UI ────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <div className="connreq-wrapper">

        {/* Page Header */}
        <div className="connreq-header">
          <div className="connreq-header-left">
            <h1 className="connreq-title">Connection Requests</h1>
            <p className="connreq-subtitle">Manage your incoming networking requests</p>
          </div>
          {!loading && requests.length > 0 && (
            <span className="connreq-count-badge">
              {requests.length} pending
            </span>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="connreq-loading">
            <span className="spinner spinner-purple" />
            <p>Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (

          /* Empty State */
          <div className="connreq-empty">
            <div className="connreq-empty-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="connreq-empty-title">No pending requests</h3>
            <p className="connreq-empty-sub">
              When someone sends you a connection request, it will appear here.
            </p>
          </div>

        ) : (

          /* Requests List */
          <div className="connreq-list">
            {requests.map((request) => {
              const isUpdating = updatingId === request._id;
              return (
                <div key={request._id} className="connreq-card">

                  {/* Avatar */}
                  <div className="connreq-avatar">
                    {getInitials(request.sender?.name)}
                  </div>

                  {/* Info */}
                  <div className="connreq-info">
                    <div className="connreq-name-row">
                      <h3 className="connreq-name">{request.sender?.name}</h3>
                      <span className={roleBadgeClass(request.sender?.role)}>
                        {request.sender?.role}
                      </span>
                    </div>

                    <div className="connreq-meta">
                      <span className="connreq-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        {request.sender?.email}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="connreq-actions">
                    <button
                      className="connreq-btn connreq-btn--accept"
                      onClick={() => updateStatus(request._id, "accepted")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                      Accept
                    </button>

                    <button
                      className="connreq-btn connreq-btn--reject"
                      onClick={() => updateStatus(request._id, "rejected")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      )}
                      Reject
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}