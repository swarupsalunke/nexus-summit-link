import express from "express";

import {
  applySponsor,
  getSponsors,
  updateSponsorStatus
} from "../controllers/sponsorController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 Apply Sponsor
router.post(
  "/",
  protect,
  applySponsor
);

// 🔥 Get Sponsors
router.get(
  "/",
  protect,
  getSponsors
);

// 🔥 Update Status
router.put(
  "/:id",
  protect,
  updateSponsorStatus
);

export default router;