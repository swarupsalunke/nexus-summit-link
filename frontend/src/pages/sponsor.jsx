import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// ── Sponsor Tiers ────────────────────────────────────
const TIERS = [
  {
    id: "Title Sponsor",
    price: 150000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    features: ["Logo on all banners & creatives", "Stage & MC mention", "VIP lounge + dinner", "10 complimentary passes", "Press release mention"],
    highlight: true,
    accentClass: "tier-accent--gold",
    iconClass: "tier-icon--gold",
    badge: "Premium",
    badgeClass: "home-tag--amber",
  },
  {
    id: "Powered By Sponsor",
    price: 100000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    features: ["Logo on event materials", "Stage mention", "5 complimentary passes", "Social media feature", "Branding at venue"],
    highlight: false,
    accentClass: "tier-accent--purple",
    iconClass: "tier-icon--purple",
    badge: "Popular",
    badgeClass: "home-tag--blue",
  },
  {
    id: "Networking Partner",
    price: 50000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    features: ["Logo on networking area", "2 complimentary passes", "Social media mention", "Branding at networking zone"],
    highlight: false,
    accentClass: "tier-accent--green",
    iconClass: "tier-icon--green",
    badge: "Starter",
    badgeClass: "home-tag--green",
  },
];

export default function Sponsor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    interest: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const authHeader = { Authorization: `Bearer ${user?.token}` };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const selectTier = (tierId) => setForm((prev) => ({ ...prev, interest: tierId }));

  const selectedTier = TIERS.find((t) => t.id === form.interest);

  // ── Payment ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company || !form.interest || !form.budget || !form.message) {
      toast.error("Please fill all fields and select a sponsorship tier");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating payment order...");

    try {
      const amount = selectedTier.price;

      const { data } = await axios.post(
        "https://nexus-summit-link.onrender.com/api/payment/create-order",
        { amount, packageType: form.interest, role: "sponsor" },
        { headers: authHeader }
      );

      toast.dismiss(toastId);

      const options = {
        key: "rzp_test_SmR6beU90uju9j",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Nexus Link Summit",
        description: `${form.interest} Payment`,
        order_id: data.order.id,

        handler: async function (response) {
          const verifyId = toast.loading("Verifying payment...");
          try {
            const verify = await axios.post(
              "https://nexus-summit-link.onrender.com/api/payment/verify-payment",
              response,
              { headers: authHeader }
            );
            if (verify.data.success) {
              await axios.post("https://nexus-summit-link.onrender.com/api/sponsor", form, { headers: authHeader });
              toast.success("Sponsorship confirmed!", { id: verifyId });
              navigate("/payment-success");
              setForm({ company: "", interest: "", budget: "", message: "" });
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment verification failed", { id: verifyId });
            navigate("/payment-failed");
          }
        },

        prefill: { name: form.company, email: user?.email },
        theme: { color: "#7c3aed" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create order", { id: toastId });
      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sponsor-wrapper">

        {/* Page Header */}
        <div className="exhibitor-page-header">
          <span className="exhibitor-eyebrow">Nexus Link Summit 2026</span>
          <h1 className="exhibitor-page-title">Sponsorship Inquiry</h1>
          <p className="exhibitor-page-subtitle">
            Partner with India's premier networking summit and amplify your brand reach
          </p>
        </div>

        {/* ── Tier Cards ── */}
        <div className="exhibitor-section-label">
          <span className="section-dot dot-purple" />
          Choose Sponsorship Tier
        </div>

        <div className="pkg-grid">
          {TIERS.map((tier) => {
            const isSelected = form.interest === tier.id;
            return (
              <div
                key={tier.id}
                className={`pkg-card ${tier.highlight ? "pkg-card--highlight" : ""} ${isSelected ? "pkg-card--selected" : ""}`}
                onClick={() => selectTier(tier.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && selectTier(tier.id)}
              >
                {tier.highlight && (
                  <div className="pkg-popular-badge">Premium Tier</div>
                )}

                <div className={`pkg-icon-wrap ${tier.iconClass}`}>{tier.icon}</div>
                <h3 className="pkg-name">{tier.id}</h3>
                <p className="pkg-price">₹{tier.price.toLocaleString()}</p>

                <ul className="pkg-features">
                  {tier.features.map((f, i) => (
                    <li key={i} className="pkg-feature-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`pkg-select-indicator ${isSelected ? "pkg-select-indicator--active" : ""}`}>
                  {isSelected ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Selected
                    </>
                  ) : "Select Tier"}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Form ── */}
        <div className="exhibitor-form-wrap">
          <div className="exhibitor-form-card">

            <div className="exhibitor-section-label" style={{ marginBottom: "1.5rem" }}>
              <span className="section-dot dot-blue" />
              Company & Inquiry Details
            </div>

            <form onSubmit={handleSubmit} className="exhibitor-form" noValidate>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </span>
                    <input id="company" className="form-input" name="company" type="text"
                      placeholder="Your company name" value={form.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="budget">Your Budget (₹)</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </span>
                    <input id="budget" className="form-input" name="budget" type="text"
                      placeholder="e.g. 100000" value={form.budget} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message / Requirements
                  <span className="form-label-hint">Tell us about your sponsorship goals</span>
                </label>
                <textarea
                  id="message"
                  className="form-input form-textarea"
                  name="message"
                  placeholder="Describe what you're looking for from this sponsorship..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              {/* Order Summary */}
              {selectedTier && (
                <div className="order-summary">
                  <div className="order-summary-row">
                    <span className="order-label">Sponsorship Tier</span>
                    <span className="order-value">{selectedTier.id}</span>
                  </div>
                  <div className="order-summary-divider" />
                  <div className="order-summary-row">
                    <span className="order-label order-total-label">Total Amount</span>
                    <span className="order-total-value">₹{selectedTier.price.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`btn-auth ${loading ? "btn-loading" : ""} ${!form.interest ? "btn-auth--disabled" : ""}`}
                disabled={loading || !form.interest}
              >
                {loading ? (
                  <><span className="spinner" /> Processing...</>
                ) : (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    {form.interest
                      ? `Pay ₹${selectedTier?.price.toLocaleString()} & Sponsor`
                      : "Select a Tier to Continue"}
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </>
  );
}