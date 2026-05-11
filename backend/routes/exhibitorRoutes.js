import express from "express";

import {
  applyExhibitor,
  getExhibitors,
  updateExhibitorStatus
} from "../controllers/exhibitorController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// 🔥 APPLY AS EXHIBITOR
// ======================================================

router.post(
  "/",
  protect,
  applyExhibitor
);

// ======================================================
// 🔥 GET ALL EXHIBITORS (ADMIN)
// ======================================================

router.get(
  "/",
  protect,
  getExhibitors
);

// ======================================================
// 🔥 UPDATE EXHIBITOR STATUS
// ======================================================

router.put(
  "/:id",
  protect,
  updateExhibitorStatus
);

export default router;