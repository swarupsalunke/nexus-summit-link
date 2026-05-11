import mongoose from "mongoose";

const sponsorSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true
    },

    interest: {
      type: String,
      required: true
    },

    budget: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "pending"
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Sponsor = mongoose.model(
  "Sponsor",
  sponsorSchema
);

export default Sponsor;