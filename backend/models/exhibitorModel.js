import mongoose from "mongoose";

const exhibitorSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true
    },

    website: {
      type: String,
      required: true
    },

    package: {
      type: String,
      required: true
    },

    contactPerson: {
      type: String,
      required: true
    },

    email: {
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

const Exhibitor = mongoose.model(
  "Exhibitor",
  exhibitorSchema
);

export default Exhibitor;