import Exhibitor from "../models/exhibitorModel.js";

// ======================================================
// 🔥 APPLY AS EXHIBITOR
// ======================================================

export const applyExhibitor = async (req, res) => {

  try {

    const {
      company,
      website,
      package: selectedPackage,
      contactPerson,
      email
    } = req.body;

    // 🔥 Validation
    if (
      !company ||
      !website ||
      !selectedPackage ||
      !contactPerson ||
      !email
    ) {
      return res.status(400).json({
        message: "Please fill all fields ❌"
      });
    }

    // 🔥 Prevent duplicate
    const alreadyApplied =
      await Exhibitor.findOne({
        userId: req.user.id
      });

    if (alreadyApplied) {
      return res.status(400).json({
        message:
          "You already applied as exhibitor ❌"
      });
    }

    // 🔥 Create exhibitor
    const exhibitor =
      await Exhibitor.create({

        company,

        website,

        package: selectedPackage,

        contactPerson,

        email,

        userId: req.user.id
      });

    res.status(201).json({

      message:
        "Exhibitor application submitted ✅",

      exhibitor
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔥 GET ALL EXHIBITORS
// ======================================================

export const getExhibitors = async (req, res) => {

  try {

    const exhibitors =
      await Exhibitor.find()
        .sort({ createdAt: -1 });

    res.json(exhibitors);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔥 UPDATE EXHIBITOR STATUS
// ======================================================

export const updateExhibitorStatus =
  async (req, res) => {

    try {

      const exhibitor =
        await Exhibitor.findById(
          req.params.id
        );

      // ❌ Not found
      if (!exhibitor) {

        return res.status(404).json({
          message:
            "Exhibitor not found ❌"
        });
      }

      // 🔥 Update status
      exhibitor.status =
        req.body.status;

      await exhibitor.save();

      res.json({

        message:
          `Exhibitor ${req.body.status} ✅`,

        exhibitor
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error ❌"
      });
    }
  };