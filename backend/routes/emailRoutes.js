import express from "express";

import sendEmail
from "../utils/sendEmail.js";

const router = express.Router();

// ======================================================
// 🔥 TEST EMAIL ROUTE
// ======================================================

router.get(
  "/test-email",

  async (req, res) => {

    try {

      await sendEmail(

        process.env.EMAIL_USER,

        "Nexus Summit Test Email",

        "Email system working successfully ✅"
      );

      res.json({

        message:
          "Test email sent ✅"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Email failed ❌"
      });
    }
  }
);

export default router;