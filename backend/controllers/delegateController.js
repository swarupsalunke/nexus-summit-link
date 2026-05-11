import Delegate from "../models/delegateModel.js";
import sendEmail from "../utils/sendEmail.js";

import User from "../models/userModel.js";

// ======================================================
// 🔹 APPLY AS DELEGATE
// ======================================================

export const applyDelegate = async (req, res) => {
  try {

    const {
      name,
      company,
      industry,
      purpose
    } = req.body;

    // 🔥 Validation
    if (
      !name ||
      !company ||
      !industry ||
      !purpose
    ) {
      return res.status(400).json({
        message: "Please fill all fields ❌"
      });
    }



    // 🔥 Count approved delegates
    const approvedCount = await Delegate.countDocuments({
      status: "approved"
    });

    // ❌ Close registration after 201
    if (approvedCount >= 201) {
      return res.status(400).json({
        message: "Delegate registration closed ❌"
      });
    }


    // 🔥 Check duplicate application
    const alreadyApplied = await Delegate.findOne({
      userId: req.user.id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied as delegate ❌"
      });
    }

    // 🔥 Create delegate
    const delegate = await Delegate.create({
      name,
      company,
      industry,
      purpose,
      userId: req.user.id
    });

    // ✅ Success
    res.status(201).json({
      message: "Delegate application submitted ✅",
      delegate
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔹 GET ALL DELEGATES (ADMIN)
// ======================================================

export const getDelegates = async (req, res) => {
  try {

    const delegates = await Delegate.find()
      .sort({ createdAt: -1 });

    res.json(delegates);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔹 APPROVE / REJECT DELEGATE
// ======================================================

export const updateStatus = async (req, res) => {
  try {

    const delegate = await Delegate.findById(
      req.params.id
    );

    // 🔥 Delegate not found
    if (!delegate) {
      return res.status(404).json({
        message: "Delegate not found ❌"
      });
    }

    // 🔥 Approved count check
    const approvedCount =
      await Delegate.countDocuments({
        status: "approved"
      });

    // 🔥 Max 201 limit
    if (
      req.body.status === "approved" &&
      approvedCount >= 201
    ) {
      return res.status(400).json({
        message: "Delegate limit reached (201) ❌"
      });
    }

    // 🔥 Update status
    delegate.status = req.body.status;

    await delegate.save();

    // ==================================================
    // 🔥 GET USER
    // ==================================================

    const user = await User.findById(
      delegate.userId
    );

    // ==================================================
    // 🔥 SEND EMAIL
    // ==================================================

    if (user) {

      // ✅ APPROVED
      if (req.body.status === "approved") {

        await sendEmail(

          user.email,

          "Delegate Application Approved",

          `Hello ${user.name},

Your delegate application for Nexus Link Summit 2026 has been approved ✅

We look forward to seeing you at the event.

Thank you,
Nexus Summit Team`
        );
      }

      // ❌ REJECTED
      if (req.body.status === "rejected") {

        await sendEmail(

          user.email,

          "Delegate Application Rejected",

          `Hello ${user.name},

We appreciate your interest in Nexus Link Summit 2026.

Unfortunately, your delegate application was not selected this time.

Thank you,
Nexus Summit Team`
        );
      }
    }

    res.json(delegate);
  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔹 GET MY DELEGATE STATUS
// ======================================================

export const getMyDelegate = async (req, res) => {
  try {

    const delegate = await Delegate.findOne({
      userId: req.user.id
    });

    // ❌ No application
    if (!delegate) {
      return res.status(404).json({
        message: "No delegate application found ❌"
      });
    }

    // ✅ Success
    res.json(delegate);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔹 GET APPROVED DELEGATES
// ======================================================

export const getApprovedDelegates =
  async (req, res) => {

    try {

      const delegates =
        await Delegate.find({

          status: "approved"
        })

          .select(
            "name company industry purpose userId"
          )

          .sort({
            createdAt: -1
          });

      // ✅ RESPONSE

      res.status(200).json(
        delegates
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server error ❌"
      });
    }
  };