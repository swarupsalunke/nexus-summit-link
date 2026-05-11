import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Delegate from "./pages/delegate";
import Exhibitor from "./pages/exhibitor";
import Sponsor from "./pages/sponsor";
import Event from "./pages/event";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";

import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

import Networking from "./pages/Networking";
import ConnectionRequests from "./pages/ConnectionRequests";

import QRCodePage from "./pages/QRCodePage";

function App() {

  // ======================================================
  // 🔥 CURRENT USER
  // ======================================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ======================================================
  // 🔥 UI
  // ======================================================

  return (

    <Router>

      <Routes>

        {/* ================================================== */}
        {/* 🔥 DEFAULT ROUTE */}
        {/* ================================================== */}

        <Route
          path="/"
          element={
            user
              ? <Navigate to="/Home" />
              : <Navigate to="/Login" />
          }
        />

        {/* ================================================== */}
        {/* 🔓 PUBLIC ROUTES */}
        {/* ================================================== */}

        <Route
          path="/Login"
          element={
            !user
              ? <Login />
              : <Navigate to="/Home" />
          }
        />

        <Route
          path="/Register"
          element={
            !user
              ? <Register />
              : <Navigate to="/Home" />
          }
        />

        {/* ================================================== */}
        {/* 🔒 PROTECTED ROUTES */}
        {/* ================================================== */}

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delegate"
          element={
            <ProtectedRoute>
              <delegate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exhibitor"
          element={
            <ProtectedRoute>
              <exhibitor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor"
          element={
            <ProtectedRoute>
              <sponsor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <event />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Networking"
          element={
            <ProtectedRoute>
              <Networking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/connection-requests"
          element={
            <ProtectedRoute>
              <ConnectionRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-qr"
          element={
            <ProtectedRoute>
              <QRCodePage />
            </ProtectedRoute>
          }
        />

        {/* ================================================== */}
        {/* 🔥 ADMIN DASHBOARD */}
        {/* ================================================== */}

        <Route
          path="/admin-dashboard"
          element={
            user?.role === "admin"
              ? (
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              )
              : (
                <Navigate to="/home" />
              )
          }
        />

        {/* ================================================== */}
        {/* 🔥 PAYMENT ROUTES */}
        {/* ================================================== */}

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment-failed"
          element={<PaymentFailed />}
        />

        {/* ================================================== */}
        {/* ❌ UNKNOWN ROUTE */}
        {/* ================================================== */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </Router>
  );
}

export default App;