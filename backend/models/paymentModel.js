import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema(

    {
      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
      },

      role: {

        type: String,

        enum: [
          "delegate",
          "exhibitor",
          "sponsor",
          "admin"
        ],

        required: true
      },

      packageType: {

        type: String,

        required: true
      },

      amount: {

        type: Number,

        required: true
      },

      razorpayOrderId: {

        type: String,

        required: true
      },

      razorpayPaymentId: {

        type: String,

        default: ""
      },

      razorpaySignature: {

        type: String,

        default: ""
      },

      paymentMethod: {

        type: String,

        default: "Razorpay"
      },

      status: {

        type: String,

        enum: [
          "created",
          "paid",
          "failed"
        ],

        default: "created"
      }
    },

    {
      timestamps: true
    }
  );

const Payment =
  mongoose.model(
    "Payment",
    paymentSchema
  );

export default Payment;