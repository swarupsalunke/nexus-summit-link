import Sponsor from "../models/sponsorModel.js";

// ======================================================
// 🔥 APPLY AS SPONSOR
// ======================================================

export const applySponsor = async (req, res) => {

  try {

    const {
      company,
      interest,
      budget,
      message
    } = req.body;

    // 🔥 Validation
    if (
      !company ||
      !interest ||
      !budget ||
      !message
    ) {
      return res.status(400).json({
        message: "Please fill all fields ❌"
      });
    }

    // 🔥 Prevent duplicate
    const alreadyApplied =
      await Sponsor.findOne({
        userId: req.user.id
      });

    if (alreadyApplied) {
      return res.status(400).json({
        message:
          "You already submitted sponsor inquiry ❌"
      });
    }

    // 🔥 Create sponsor inquiry
    const sponsor =
      await Sponsor.create({

        company,

        interest,

        budget,

        message,

        userId: req.user.id
      });

    res.status(201).json({

      message:
        "Sponsor inquiry submitted ✅",

      sponsor
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔥 GET ALL SPONSORS (ADMIN)
// ======================================================

export const getSponsors = async (req, res) => {

  try {

    const sponsors =
      await Sponsor.find()
        .sort({ createdAt: -1 });

    res.json(sponsors);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔥 UPDATE SPONSOR STATUS
// ======================================================

export const updateSponsorStatus =
  async (req, res) => {

    try {

      const sponsor =
        await Sponsor.findById(
          req.params.id
        );

      // ❌ Not found
      if (!sponsor) {

        return res.status(404).json({
          message:
            "Sponsor inquiry not found ❌"
        });
      }

      // 🔥 Update status
      sponsor.status =
        req.body.status;

      await sponsor.save();

      res.json({

        message:
          `Sponsor ${req.body.status} ✅`,

        sponsor
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error ❌"
      });
    }
  };