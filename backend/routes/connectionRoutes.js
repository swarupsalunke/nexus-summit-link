import express from "express";

import {

  sendConnectionRequest,

  getMyRequests,

  updateConnectionStatus

} from "../controllers/connectionController.js";

import {

  protect

} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// 🔥 SEND REQUEST
// ======================================================

router.post(

  "/send",

  protect,

  sendConnectionRequest
);

// ======================================================
// 🔥 GET MY REQUESTS
// ======================================================

router.get(

  "/my-requests",

  protect,

  getMyRequests
);

// ======================================================
// 🔥 ACCEPT / REJECT
// ======================================================

router.put(

  "/:id",

  protect,

  updateConnectionStatus
);

export default router;