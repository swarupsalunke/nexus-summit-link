import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function PaymentFailed() {

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
              color: "red",
              marginBottom: "20px"
            }}
          >
            ❌ Payment Failed
          </h1>

          <p
            style={{
              marginBottom: "20px",
              fontSize: "18px"
            }}
          >
            Your payment could not
            be completed.
          </p>

          <p>
            Please try again.
          </p>

          <Link to="/exhibitor">

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
              Retry Payment
            </button>

          </Link>

        </div>

      </div>
    </>
  );
}