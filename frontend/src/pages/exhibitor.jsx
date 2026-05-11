import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// ── Package Data ─────────────────────────────────────
const PACKAGES = [
  {
    id: "Basic Stall",
    price: 25000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    features: ["Standard stall space", "Basic branding", "2 staff passes", "Event listing"],
    highlight: false,
  },
  {
    id: "Premium Stall",
    price: 50000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    features: ["Premium corner space", "Enhanced branding", "5 staff passes", "Featured listing", "Networking dinner"],
    highlight: true,
  },
  {
    id: "Demo Booth",
    price: 75000,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    features: ["Full demo setup", "Stage presentation slot", "10 staff passes", "Premium listing", "VIP dinner + lounge"],
    highlight: false,
  },
];

export default function Exhibitor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    website: "",
    package: "",
    contactPerson: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const authHeader = { Authorization: `Bearer ${user?.token}` };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectPackage = (pkgId) => {
    setForm((prev) => ({ ...prev, package: pkgId }));
  };

  const selectedPkg = PACKAGES.find((p) => p.id === form.package);

  // ── Payment Handler ──────────────────────────────────
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!form.company || !form.website || !form.package || !form.contactPerson || !form.email) {
      toast.error("Please fill all fields and select a package");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating payment order...");

    try {
      const amount = selectedPkg.price;

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount, packageType: form.package, role: "exhibitor" },
        { headers: authHeader }
      );

      toast.dismiss(toastId);

      const options = {
        key: "rzp_test_SmR6beU90uju9j",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Nexus Link Summit",
        description: `${form.package} Payment`,
        order_id: data.order.id,

        handler: async function (response) {
          const verifyId = toast.loading("Verifying payment...");
          try {
            const verify = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              response,
              { headers: authHeader }
            );

            if (verify.data.success) {
              await axios.post("http://localhost:5000/api/exhibitor", form, {
                headers: authHeader,
              });
              toast.success("Registration successful!", { id: verifyId });
              navigate("/payment-success");
              setForm({ company: "", website: "", package: "", contactPerson: "", email: "" });
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment verification failed", { id: verifyId });
            navigate("/payment-failed");
          }
        },

        prefill: { name: form.contactPerson, email: form.email },
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

  // ── UI ────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <div className="exhibitor-wrapper">

        {/* Page Header */}
        <div className="exhibitor-page-header">
          <span className="exhibitor-eyebrow">Nexus Link Summit 2026</span>
          <h1 className="exhibitor-page-title">Exhibitor Registration</h1>
          <p className="exhibitor-page-subtitle">
            Showcase your brand to thousands of industry leaders and decision-makers
          </p>
        </div>

        {/* ── Package Selector ── */}
        <div className="exhibitor-section-label">
          <span className="section-dot dot-purple" />
          Choose Your Package
        </div>

        <div className="pkg-grid">
          {PACKAGES.map((pkg) => {
            const isSelected = form.package === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`pkg-card ${pkg.highlight ? "pkg-card--highlight" : ""} ${isSelected ? "pkg-card--selected" : ""}`}
                onClick={() => selectPackage(pkg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && selectPackage(pkg.id)}
              >
                {pkg.highlight && (
                  <div className="pkg-popular-badge">Most Popular</div>
                )}

                <div className="pkg-icon-wrap">{pkg.icon}</div>
                <h3 className="pkg-name">{pkg.id}</h3>
                <p className="pkg-price">
                  ₹{pkg.price.toLocaleString()}
                </p>

                <ul className="pkg-features">
                  {pkg.features.map((f, i) => (
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
                  ) : (
                    "Select Package"
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Details Form ── */}
        <div className="exhibitor-form-wrap">
          <div className="exhibitor-form-card">

            <div className="exhibitor-section-label" style={{ marginBottom: "1.5rem" }}>
              <span className="section-dot dot-blue" />
              Company Details
            </div>

            <form onSubmit={handlePayment} className="exhibitor-form" noValidate>

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
                      placeholder="Acme Corp" value={form.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="website">Company Website</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </span>
                    <input id="website" className="form-input" name="website" type="text"
                      placeholder="https://yourcompany.com" value={form.website} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactPerson">Contact Person</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input id="contactPerson" className="form-input" name="contactPerson" type="text"
                      placeholder="John Doe" value={form.contactPerson} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <input id="email" className="form-input" name="email" type="email"
                      placeholder="john@company.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              {selectedPkg && (
                <div className="order-summary">
                  <div className="order-summary-row">
                    <span className="order-label">Selected Package</span>
                    <span className="order-value">{selectedPkg.id}</span>
                  </div>
                  <div className="order-summary-divider" />
                  <div className="order-summary-row">
                    <span className="order-label order-total-label">Total Amount</span>
                    <span className="order-total-value">₹{selectedPkg.price.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`btn-auth ${loading ? "btn-loading" : ""} ${!form.package ? "btn-auth--disabled" : ""}`}
                disabled={loading || !form.package}
              >
                {loading ? (
                  <><span className="spinner" /> Processing...</>
                ) : (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    {form.package ? `Pay ₹${selectedPkg?.price.toLocaleString()} & Register` : "Select a Package to Continue"}
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