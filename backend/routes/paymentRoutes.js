import express from "express";

import {

  createOrder,

  verifyPayment,

  getPaymentStats

} from "../controllers/paymentController.js";

import {

  protect

} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// 🔥 CREATE ORDER
// ======================================================

router.post(

  "/create-order",

  protect,

  createOrder
);

// ======================================================
// 🔥 VERIFY PAYMENT
// ======================================================

router.post(

  "/verify-payment",

  protect,

  verifyPayment
);

// ======================================================
// 🔥 TEST PAYMENT ROUTE
// ======================================================

router.get(

  "/test",

  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        "Payment routes working ✅"
    });
  }
);

router.get(

  "/stats",

  protect,

  getPaymentStats
);

export default router;