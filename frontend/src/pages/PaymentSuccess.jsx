import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function PaymentSuccess() {

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f3f4f6",
          padding: "20px"
        }}
      >

        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.1)"
          }}
        >

          <h1
            style={{
              color: "green",
              marginBottom: "20px"
            }}
          >
            ✅ Payment Successful
          </h1>

          <p
            style={{
              marginBottom: "15px",
              fontSize: "18px"
            }}
          >
            Thank you for registering
            as an Exhibitor for
            Nexus Link Summit 2026.
          </p>

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              background: "#f9fafb",
              padding: "20px",
              borderRadius: "10px"
            }}
          >

            <p>
              📍 Venue:
              Pune
            </p>

            <p>
              📅 Date:
              6 June 2026
            </p>

            <p>
              ⏰ Time:
              9 AM – 6 PM
            </p>

          </div>

          <Link to="/">

            <button
              style={{
                marginTop: "30px",
                width: "100%",
                padding: "12px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Go To Home
            </button>

          </Link>

        </div>

      </div>
    </>
  );
}