import express from "express";

import {

  applyDelegate,

  getDelegates,

  updateStatus,

  getApprovedDelegates,

  getMyDelegate

} from "../controllers/delegateController.js";

import {

  protect,

  adminOnly

} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// 🔹 APPLY AS DELEGATE
// ======================================================

router.post(

  "/",

  protect,

  applyDelegate
);

// ======================================================
// 🔹 GET ALL DELEGATES (ADMIN)
// ======================================================

router.get(

  "/",

  protect,

  adminOnly,

  getDelegates
);

// ======================================================
// 🔹 GET APPROVED DELEGATES
// ======================================================

router.get(

  "/approved",

  protect,

  getApprovedDelegates
);

// ======================================================
// 🔹 GET MY DELEGATE
// ======================================================

router.get(

  "/me",

  protect,

  getMyDelegate
);

// ======================================================
// 🔹 APPROVE / REJECT DELEGATE
// ======================================================

router.put(

  "/:id",

  protect,

  adminOnly,

  updateStatus
);

export default router;