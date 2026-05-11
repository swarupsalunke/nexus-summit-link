import Navbar from "../components/Navbar";

// ── Schedule Data ────────────────────────────────────
const SCHEDULE = [
  { time: "9:00 AM",  title: "Registration & Welcome",  desc: "Attendee check-in and networking",             icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 1 0-8 0" },
  { time: "10:00 AM", title: "Opening Keynote",          desc: "Future of Startups & Innovation",              icon: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" },
  { time: "11:00 AM", title: "Investor Networking",      desc: "Meet investors and founders",                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { time: "12:00 PM", title: "Networking Lunch",         desc: "Lunch and collaboration session",              icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" },
  { time: "1:00 PM",  title: "Startup Pitch Session",    desc: "Selected startups pitch live",                 icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { time: "2:00 PM",  title: "Exhibitor Demo Slots",     desc: "Live demos and product showcases",             icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" },
  { time: "3:30 PM",  title: "Founder Panel Discussion", desc: "Scaling startups in India",                    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { time: "5:00 PM",  title: "Closing Ceremony",         desc: "Awards and final networking",                  icon: "M5 3l14 9-14 9V3z" },
];

const DEMO_SLOTS = [
  { time: "2:00 PM", company: "TechCorp",  topic: "AI Automation Demo",       tag: "AI / ML" },
  { time: "2:30 PM", company: "FintechX",  topic: "Digital Banking Platform",  tag: "Fintech" },
  { time: "3:00 PM", company: "SaaSFlow",  topic: "Cloud SaaS Solutions",      tag: "Cloud" },
];

export default function Event() {
  return (
    <>
      <Navbar />

      <div className="event-wrapper">

        {/* ── Hero Header ─────────────────────────────── */}
        <div className="event-hero">
          <div className="home-blob home-blob-1" style={{ opacity: 0.4 }} />
          <div className="home-blob home-blob-2" style={{ opacity: 0.3 }} />

          <div className="event-hero-inner">
            <span className="exhibitor-eyebrow">Event Schedule</span>
            <h1 className="event-hero-title">Nexus Link Summit 2026</h1>

            <div className="event-hero-meta">
              <span className="event-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Pune, Maharashtra
              </span>
              <span className="event-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                6 June 2026
              </span>
              <span className="event-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                9 AM – 6 PM
              </span>
            </div>
          </div>
        </div>

        <div className="event-body">

          {/* ── Timeline ──────────────────────────────── */}
          <div className="event-section-label">
            <span className="section-dot dot-purple" />
            Full Day Schedule
            <span className="badge badge-purple" style={{ marginLeft: 8 }}>{SCHEDULE.length} sessions</span>
          </div>

          <div className="event-timeline">
            {SCHEDULE.map((item, index) => (
              <div key={index} className="timeline-item">

                {/* Connector line + dot */}
                <div className="timeline-connector">
                  <div className="timeline-dot" />
                  {index < SCHEDULE.length - 1 && <div className="timeline-line" />}
                </div>

                {/* Time label */}
                <div className="timeline-time">{item.time}</div>

                {/* Card */}
                <div className="timeline-card">
                  <div className="timeline-card-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="timeline-card-title">{item.title}</h3>
                    <p className="timeline-card-desc">{item.desc}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* ── Demo Slots ────────────────────────────── */}
          <div className="event-section-label" style={{ marginTop: "3rem" }}>
            <span className="section-dot dot-green" />
            Exhibitor Demo Slots
            <span className="badge badge-success" style={{ marginLeft: 8 }}>{DEMO_SLOTS.length} demos</span>
          </div>

          <div className="event-demo-grid">
            {DEMO_SLOTS.map((slot, index) => (
              <div key={index} className="demo-card">
                <div className="demo-card-top">
                  <span className="demo-time">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {slot.time}
                  </span>
                  <span className="badge badge-success">{slot.tag}</span>
                </div>

                <h3 className="demo-company">{slot.company}</h3>
                <p className="demo-topic">{slot.topic}</p>

                <div className="demo-card-footer">
                  <span className="demo-slot-label">Demo Slot {index + 1}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}