import Connection from "../models/connectionModel.js";

// ======================================================
// 🔥 SEND CONNECTION REQUEST
// ======================================================

export const sendConnectionRequest =
  async (req, res) => {

    try {

      const { receiverId } =
        req.body;

      // ❌ SELF REQUEST
      if (
        receiverId === req.user.id
      ) {

        return res.status(400).json({

          message:
            "You cannot connect with yourself ❌"
        });
      }

      // 🔥 CHECK EXISTING REQUEST

      const alreadyExists =
        await Connection.findOne({

          sender: req.user.id,

          receiver: receiverId
        });

      if (alreadyExists) {

        return res.status(400).json({

          message:
            "Connection request already sent ❌"
        });
      }

      // 🔥 CREATE REQUEST

      const connection =
        await Connection.create({

          sender: req.user.id,

          receiver: receiverId
        });

      res.status(201).json({

        success: true,

        message:
          "Connection request sent ✅",

        connection
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server error ❌"
      });
    }
  };

// ======================================================
// 🔥 GET MY REQUESTS
// ======================================================

export const getMyRequests =
  async (req, res) => {

    try {

      const requests =
        await Connection.find({

          receiver: req.user.id,

          status: "pending"
        })

          .populate(

            "sender",

            "name email role"
          )

          .sort({
            createdAt: -1
          });

      res.json(requests);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server error ❌"
      });
    }
  };

// ======================================================
// 🔥 ACCEPT / REJECT REQUEST
// ======================================================

export const updateConnectionStatus =
  async (req, res) => {

    try {

      const connection =
        await Connection.findById(
          req.params.id
        );

      if (!connection) {

        return res.status(404).json({

          message:
            "Connection request not found ❌"
        });
      }

      connection.status =
        req.body.status;

      await connection.save();

      res.json({

        success: true,

        message:
          `Connection ${req.body.status} ✅`
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server error ❌"
      });
    }
  };