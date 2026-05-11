import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Delegate from "./pages/Delegate";
import Exhibitor from "./pages/Exhibitor";
import Sponsor from "./pages/Sponsor";
import Event from "./pages/Event";
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
              ? <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />

        {/* ================================================== */}
        {/* 🔓 PUBLIC ROUTES */}
        {/* ================================================== */}

        <Route
          path="/login"
          element={
            !user
              ? <Login />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/register"
          element={
            !user
              ? <Register />
              : <Navigate to="/home" />
          }
        />

        {/* ================================================== */}
        {/* 🔒 PROTECTED ROUTES */}
        {/* ================================================== */}

        <Route
          path="/home"
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
              <Delegate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exhibitor"
          element={
            <ProtectedRoute>
              <Exhibitor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor"
          element={
            <ProtectedRoute>
              <Sponsor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <Event />
            </ProtectedRoute>
          }
        />

        <Route
          path="/networking"
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