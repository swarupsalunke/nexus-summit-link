import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Delegate() {

  const [form, setForm] = useState({
    name: "",
    company: "",
    industry: "",
    purpose: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [registrationClosed, setRegistrationClosed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const authHeader = { Authorization: `Bearer ${user?.token}` };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Fetch Status ─────────────────────────────────────
  const fetchStatus = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/delegate/me",
        { headers: authHeader }
      );
      setStatus(data.status);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchStatus();
    else setLoading(false);
  }, []);

  // ── Submit ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.company || !form.industry || !form.purpose) {
      toast.error("Please fill all fields");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/delegate", form, {
        headers: authHeader,
      });

      toast.success("Application submitted successfully!");
      setForm({ name: "", company: "", industry: "", purpose: "" });
      fetchStatus();
    } catch (error) {
      console.log(error.response?.data);
      const msg = error.response?.data?.message || "Application failed";

      if (msg === "Delegate registration closed ❌") {
        setRegistrationClosed(true);
        toast.error("Delegate registration is currently closed");
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── Status Config ────────────────────────────────────
  const statusConfig = {
    approved: {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      label: "Application Approved",
      message: "Congratulations! You're approved. See you at the event.",
      className: "status-approved",
    },
    pending: {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: "Under Review",
      message: "Your application is being reviewed. We'll notify you soon.",
      className: "status-pending",
    },
    rejected: {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      ),
      label: "Application Rejected",
      message: "Sorry, your application was not selected this time.",
      className: "status-rejected",
    },
  };

  // ── UI ────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <div className="delegate-wrapper">
        <div className="delegate-container">

          {/* Left — Info Panel */}
          <div className="delegate-info-panel">
            <div className="delegate-info-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>

            <h2 className="delegate-info-title">Delegate Registration</h2>
            <p className="delegate-info-desc">
              Apply to attend as an official delegate. Get exclusive access to sessions, networking opportunities, and more.
            </p>

            <div className="delegate-perks">
              {[
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Access to all sessions" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Exclusive networking" },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", text: "Official delegate badge" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Priority event schedule" },
              ].map((perk, i) => (
                <div className="perk-item" key={i}>
                  <span className="perk-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={perk.icon} />
                    </svg>
                  </span>
                  <span>{perk.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form / Status Card */}
          <div className="delegate-form-card">

            {/* Registration Closed Banner */}
            {registrationClosed && (
              <div className="reg-closed-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Delegate registration is currently closed.
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div className="delegate-loading">
                <span className="spinner spinner-purple" />
                <p>Checking your status...</p>
              </div>
            ) : status ? (
              /* ── Status Display ── */
              <div className={`delegate-status-card ${statusConfig[status]?.className}`}>
                <div className="delegate-status-icon">
                  {statusConfig[status]?.icon}
                </div>
                <div>
                  <h3 className="delegate-status-label">
                    {statusConfig[status]?.label}
                  </h3>
                  <p className="delegate-status-msg">
                    {statusConfig[status]?.message}
                  </p>
                </div>
              </div>
            ) : !registrationClosed ? (
              /* ── Application Form ── */
              <>
                <div className="delegate-form-header">
                  <h2 className="delegate-form-title">Apply as Delegate</h2>
                  <p className="delegate-form-subtitle">Fill in your details to submit your application</p>
                </div>

                <form onSubmit={handleSubmit} className="delegate-form" noValidate>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Full Name</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                        </span>
                        <input
                          id="name"
                          className="form-input"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Company</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                        </span>
                        <input
                          id="company"
                          className="form-input"
                          name="company"
                          type="text"
                          placeholder="Your company name"
                          value={form.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="industry">Industry</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                        </svg>
                      </span>
                      <select
                        id="industry"
                        className="form-input form-select"
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                      >
                        <option value="">Select your industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="purpose">
                      Purpose of Attendance
                      <span className="form-label-hint">Tell us why you'd like to attend</span>
                    </label>
                    <textarea
                      id="purpose"
                      className="form-input form-textarea"
                      name="purpose"
                      placeholder="Describe your purpose and what you hope to gain from the event..."
                      value={form.purpose}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <button
                    className={`btn-auth ${submitting ? "btn-loading" : ""}`}
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <><span className="spinner" /> Submitting...</>
                    ) : (
                      "Submit Application"
                    )}
                  </button>

                </form>
              </>
            ) : null}

          </div>
        </div>
      </div>
    </>
  );
}