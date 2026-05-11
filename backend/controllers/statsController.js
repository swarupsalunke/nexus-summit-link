import Delegate from "../models/delegateModel.js";

import Exhibitor from "../models/exhibitorModel.js";

import Sponsor from "../models/sponsorModel.js";

// ======================================================
// 🔥 GET STATS
// ======================================================

export const getStats =
  async (req, res) => {

    try {

      // ==================================================
      // 🔥 DELEGATE STATS
      // ==================================================

      const totalDelegates =
        await Delegate.countDocuments();

      const approvedDelegates =
        await Delegate.countDocuments({

          status: "approved"
        });

      // ==================================================
      // 🔥 EXHIBITOR STATS
      // ==================================================

      const totalExhibitors =
        await Exhibitor.countDocuments();

      const approvedExhibitors =
        await Exhibitor.countDocuments({

          status: "approved"
        });

      // ==================================================
      // 🔥 SPONSOR STATS
      // ==================================================

      const totalSponsors =
        await Sponsor.countDocuments();

      const approvedSponsors =
        await Sponsor.countDocuments({

          status: "approved"
        });

      // ==================================================
      // 🔥 RESPONSE
      // ==================================================

      res.status(200).json({

        totalDelegates,

        approvedDelegates,

        totalExhibitors,

        approvedExhibitors,

        totalSponsors,

        approvedSponsors
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Stats fetch failed ❌"
      });
    }
  };