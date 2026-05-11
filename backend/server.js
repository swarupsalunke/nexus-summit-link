import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import delegateRoutes from "./routes/delegateRoutes.js";
import exhibitorRoutes from "./routes/exhibitorRoutes.js";
import sponsorRoutes from "./routes/sponsorRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";



// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Root Route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// API Routes
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/delegate", delegateRoutes);
app.use("/api/exhibitor", exhibitorRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/connection",connectionRoutes);


// 404 Handler (optional but good practice)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});