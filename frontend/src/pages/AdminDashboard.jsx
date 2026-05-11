import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {

  // ── States ──────────────────────────────────────────
  const [delegates, setDelegates] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [paymentStats, setPaymentStats] = useState({
    totalRevenue: 0,
    totalPaidExhibitors: 0,
    packageStats: [],
    recentPayments: [],
  });
  const [loading, setLoading] = useState(true);

  // ── Filter States ────────────────────────────────────
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));
  const authHeader = { Authorization: `Bearer ${user?.token}` };

  // ── Fetch Dashboard Data ─────────────────────────────
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [delegateRes, exhibitorRes, sponsorRes, paymentRes] =
        await Promise.all([
          axios.get("https://nexus-summit-link.onrender.com/api/delegate",     { headers: authHeader }),
          axios.get("https://nexus-summit-link.onrender.com/api/exhibitor",    { headers: authHeader }),
          axios.get("https://nexus-summit-link.onrender.com/api/sponsor",      { headers: authHeader }),
          axios.get("https://nexus-summit-link.onrender.com/api/payment/stats",{ headers: authHeader }),
        ]);

      setDelegates(delegateRes.data);
      setExhibitors(exhibitorRes.data);
      setSponsors(sponsorRes.data);
      setPaymentStats(paymentRes.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  // ── Status Updaters ──────────────────────────────────
  const updateDelegateStatus = async (id, status) => {
    const toastId = toast.loading("Updating...");
    try {
      await axios.put(`https://nexus-summit-link.onrender.com/api/delegate/${id}`, { status }, { headers: authHeader });
      toast.success(`Delegate ${status}`, { id: toastId });
      fetchDashboardData();
    } catch {
      toast.error("Update failed", { id: toastId });
    }
  };

  const updateExhibitorStatus = async (id, status) => {
    const toastId = toast.loading("Updating...");
    try {
      await axios.put(`https://nexus-summit-link.onrender.com/api/exhibitor/${id}`, { status }, { headers: authHeader });
      toast.success(`Exhibitor ${status}`, { id: toastId });
      fetchDashboardData();
    } catch {
      toast.error("Update failed", { id: toastId });
    }
  };

  const updateSponsorStatus = async (id, status) => {
    const toastId = toast.loading("Updating...");
    try {
      await axios.put(`https://nexus-summit-link.onrender.com/api/sponsor/${id}`, { status }, { headers: authHeader });
      toast.success(`Sponsor ${status}`, { id: toastId });
      fetchDashboardData();
    } catch {
      toast.error("Update failed", { id: toastId });
    }
  };

  // ── Computed Stats ───────────────────────────────────
  const approvedDelegates = delegates.filter((d) => d.status === "approved").length;
  const pendingDelegates  = delegates.filter((d) => d.status === "pending").length;
  const approvedExhibitors = exhibitors.filter((e) => e.status === "approved").length;
  const pendingExhibitors  = exhibitors.filter((e) => e.status === "pending").length;
  const approvedSponsors = sponsors.filter((s) => s.status === "approved").length;
  const pendingSponsors  = sponsors.filter((s) => s.status === "pending").length;

  const filteredDelegates = delegates.filter((d) => {
    const industryMatch = industryFilter === "all" || d.industry === industryFilter;
    const statusMatch   = statusFilter === "all"   || d.status === statusFilter;
    return industryMatch && statusMatch;
  });

  // ── Status Badge ─────────────────────────────────────
  const StatusBadge = ({ status }) => (
    <span className={`badge badge-${
      status === "approved" ? "success" :
      status === "pending"  ? "warning" : "danger"
    }`}>
      {status}
    </span>
  );

  // ── Action Buttons ────────────────────────────────────
  const ActionButtons = ({ status, onApprove, onReject }) =>
    status === "pending" ? (
      <div className="dash-action-group">
        <button className="btn-action btn-approve" onClick={onApprove}>Approve</button>
        <button className="btn-action btn-reject"  onClick={onReject}>Reject</button>
      </div>
    ) : (
      <StatusBadge status={status} />
    );

  // ── Empty Row ─────────────────────────────────────────
  const EmptyRow = ({ cols, message }) => (
    <tr>
      <td colSpan={cols} className="dash-table-empty">{message}</td>
    </tr>
  );

  // ── UI ────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <div className="dash-wrapper">

        {/* Page Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Admin Dashboard</h1>
            <p className="dash-subtitle">Manage delegates, exhibitors, sponsors & revenue</p>
          </div>
          <button className="btn-refresh" onClick={fetchDashboardData} title="Refresh">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="dash-loading">
            <span className="spinner spinner-purple" />
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* ── STAT CARDS ─────────────────────────────── */}
            <div className="dash-stats-grid">

              <div className="dash-stat-card">
                <div className="dash-stat-icon icon-purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="dash-stat-body">
                  <p className="dash-stat-label">Total Delegates</p>
                  <h2 className="dash-stat-value">{delegates.length}</h2>
                  <div className="dash-stat-pills">
                    <span className="pill-green">{approvedDelegates} approved</span>
                    <span className="pill-amber">{pendingDelegates} pending</span>
                  </div>
                </div>
              </div>

              <div className="dash-stat-card">
                <div className="dash-stat-icon icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div className="dash-stat-body">
                  <p className="dash-stat-label">Total Exhibitors</p>
                  <h2 className="dash-stat-value">{exhibitors.length}</h2>
                  <div className="dash-stat-pills">
                    <span className="pill-green">{approvedExhibitors} approved</span>
                    <span className="pill-amber">{pendingExhibitors} pending</span>
                  </div>
                </div>
              </div>

              <div className="dash-stat-card">
                <div className="dash-stat-icon icon-coral">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div className="dash-stat-body">
                  <p className="dash-stat-label">Total Sponsors</p>
                  <h2 className="dash-stat-value">{sponsors.length}</h2>
                  <div className="dash-stat-pills">
                    <span className="pill-green">{approvedSponsors} approved</span>
                    <span className="pill-amber">{pendingSponsors} pending</span>
                  </div>
                </div>
              </div>

              <div className="dash-stat-card dash-stat-card--revenue">
                <div className="dash-stat-icon icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="dash-stat-body">
                  <p className="dash-stat-label">Total Revenue</p>
                  <h2 className="dash-stat-value">₹{paymentStats.totalRevenue?.toLocaleString()}</h2>
                  <div className="dash-stat-pills">
                    <span className="pill-green">{paymentStats.totalPaidExhibitors} paid exhibitors</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── DELEGATES TABLE ─────────────────────────── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <span className="section-dot dot-purple" />
                  Delegates
                  <span className="badge badge-gray" style={{ marginLeft: "10px" }}>{delegates.length}</span>
                </h2>

                <div className="dash-filters">
                  <select className="dash-select" value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}>
                    <option value="all">All Industries</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                  <select className="dash-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="dash-table-wrapper">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Industry</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDelegates.length > 0 ? (
                      filteredDelegates.map((d) => (
                        <tr key={d._id}>
                          <td className="td-name">{d.name}</td>
                          <td>{d.company}</td>
                          <td><span className="badge badge-purple">{d.industry}</span></td>
                          <td><StatusBadge status={d.status} /></td>
                          <td>
                            <ActionButtons
                              status={d.status}
                              onApprove={() => updateDelegateStatus(d._id, "approved")}
                              onReject={()  => updateDelegateStatus(d._id, "rejected")}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <EmptyRow cols={5} message="No delegates found" />
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── REVENUE ANALYTICS ───────────────────────── */}
            <div className="dash-two-col">

              <div className="dash-section">
                <div className="dash-section-header">
                  <h2 className="dash-section-title">
                    <span className="section-dot dot-green" />
                    Revenue Analytics
                  </h2>
                </div>
                <div className="dash-table-wrapper">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Package</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentStats.packageStats?.length > 0 ? (
                        paymentStats.packageStats.map((p, i) => (
                          <tr key={i}>
                            <td><span className="badge badge-purple">{p._id}</span></td>
                            <td>{p.count}</td>
                            <td className="td-revenue">₹{p.revenue?.toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <EmptyRow cols={3} message="No payment data found" />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dash-section">
                <div className="dash-section-header">
                  <h2 className="dash-section-title">
                    <span className="section-dot dot-blue" />
                    Recent Payments
                  </h2>
                </div>
                <div className="dash-table-wrapper">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Package</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentStats.recentPayments?.length > 0 ? (
                        paymentStats.recentPayments.map((p) => (
                          <tr key={p._id}>
                            <td>{p.packageType}</td>
                            <td className="td-revenue">₹{p.amount?.toLocaleString()}</td>
                            <td><StatusBadge status={p.status} /></td>
                          </tr>
                        ))
                      ) : (
                        <EmptyRow cols={3} message="No payments found" />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* ── EXHIBITORS TABLE ─────────────────────────── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <span className="section-dot dot-blue" />
                  Exhibitors
                  <span className="badge badge-gray" style={{ marginLeft: "10px" }}>{exhibitors.length}</span>
                </h2>
              </div>
              <div className="dash-table-wrapper">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Package</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exhibitors.length > 0 ? (
                      exhibitors.map((e) => (
                        <tr key={e._id}>
                          <td className="td-name">{e.company}</td>
                          <td><span className="badge badge-purple">{e.package}</span></td>
                          <td><StatusBadge status={e.status} /></td>
                          <td>
                            <ActionButtons
                              status={e.status}
                              onApprove={() => updateExhibitorStatus(e._id, "approved")}
                              onReject={()  => updateExhibitorStatus(e._id, "rejected")}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <EmptyRow cols={4} message="No exhibitors found" />
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── SPONSORS TABLE ───────────────────────────── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <span className="section-dot dot-coral" />
                  Sponsors
                  <span className="badge badge-gray" style={{ marginLeft: "10px" }}>{sponsors.length}</span>
                </h2>
              </div>
              <div className="dash-table-wrapper">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Interest</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsors.length > 0 ? (
                      sponsors.map((s) => (
                        <tr key={s._id}>
                          <td className="td-name">{s.company}</td>
                          <td>{s.interest}</td>
                          <td className="td-revenue">₹{s.budget?.toLocaleString()}</td>
                          <td><StatusBadge status={s.status} /></td>
                          <td>
                            <ActionButtons
                              status={s.status}
                              onApprove={() => updateSponsorStatus(s._id, "approved")}
                              onReject={()  => updateSponsorStatus(s._id, "rejected")}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <EmptyRow cols={5} message="No sponsors found" />
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
}