import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 No user
  if (!user) {
    return <Navigate to="/login" />;
  }

  try {

    // 🔥 Decode token
    const decoded = jwtDecode(user.token);

    // 🔥 Current time
    const currentTime = Date.now() / 1000;

    // ❌ Token expired
    if (decoded.exp < currentTime) {

      localStorage.removeItem("user");

      return <Navigate to="/login" />;
    }

  } catch (error) {

    console.log(error);

    localStorage.removeItem("user");

    return <Navigate to="/login" />;
  }

  // ✅ Token valid
  return children;
}