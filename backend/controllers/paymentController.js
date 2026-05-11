import dotenv from "dotenv";
dotenv.config();

import sendEmail from "../utils/sendEmail.js";

import Razorpay from "razorpay";

import crypto from "crypto";

import Payment from "../models/paymentModel.js";

// ======================================================
// 🔥 RAZORPAY INSTANCE
// ======================================================

const razorpay = new Razorpay({

  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});

// ======================================================
// 🔥 CREATE ORDER
// ======================================================

export const createOrder =
  async (req, res) => {

    try {

      const {

        amount,

        packageType,

        role

      } = req.body;

      // ==================================================
      // ❌ VALIDATION
      // ==================================================

      if (!amount) {

        return res.status(400).json({

          success: false,

          message:
            "Amount required ❌"
        });
      }

      // ==================================================
      // 🔥 CREATE RAZORPAY ORDER
      // ==================================================

      const options = {

        amount:
          amount * 100,

        currency: "INR",

        receipt:
          `receipt_${Date.now()}`
      };

      const order =
        await razorpay.orders.create(
          options
        );

      // ==================================================
      // 🔥 SAVE PAYMENT IN DB
      // ==================================================

      const payment =
        await Payment.create({

          userId:
            req.user.id,

          role:
            role || "exhibitor",

          packageType:
            packageType || "Basic Package",

          amount,

          razorpayOrderId:
            order.id,

          status: "created"
        });

      // ==================================================
      // 🔥 RESPONSE
      // ==================================================

      res.status(200).json({

        success: true,

        order,

        payment
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Order creation failed ❌"
      });
    }
  };

// ======================================================
// 🔥 VERIFY PAYMENT
// ======================================================

export const verifyPayment =
  async (req, res) => {

    try {

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

      } = req.body;

      // ==================================================
      // ❌ VALIDATION
      // ==================================================

      if (

        !razorpay_order_id ||

        !razorpay_payment_id ||

        !razorpay_signature
      ) {

        return res.status(400).json({

          success: false,

          message:
            "All payment fields required ❌"
        });
      }

      // ==================================================
      // 🔥 GENERATE SIGNATURE
      // ==================================================

      const generatedSignature =

        crypto
          .createHmac(

            "sha256",

            process.env
              .RAZORPAY_KEY_SECRET
          )

          .update(

            razorpay_order_id +

            "|" +

            razorpay_payment_id
          )

          .digest("hex");

      // ==================================================
      // 🔥 VERIFY SIGNATURE
      // ==================================================

      if (

        generatedSignature !==

        razorpay_signature
      ) {

        // ❌ UPDATE FAILED STATUS

        await Payment.findOneAndUpdate(

          {
            razorpayOrderId:
              razorpay_order_id
          },

          {
            status: "failed"
          }
        );

        return res.status(400).json({

          success: false,

          message:
            "Payment verification failed ❌"
        });
      }

      // ==================================================
      // 🔥 UPDATE PAYMENT SUCCESS
      // ==================================================

      const updatedPayment =

        await Payment.findOneAndUpdate(

          {
            razorpayOrderId:
              razorpay_order_id
          },

          {

            razorpayPaymentId:
              razorpay_payment_id,

            razorpaySignature:
              razorpay_signature,

            status: "paid"
          },

          { new: true }
        );

      // ==================================================
      // 🔥 SEND CONFIRMATION EMAIL
      // ==================================================

      await sendEmail(

        req.user.email,

        "Payment Successful - Nexus Link Summit 2026",

        `
          <h2>
            Payment Successful ✅
          </h2>

          <p>
            Thank you for registering
            for Nexus Link Summit 2026.
          </p>

          <h3>
            Payment Details
          </h3>

          <p>
            Package:
            ${updatedPayment.packageType}
          </p>

          <p>
            Amount:
            ₹${updatedPayment.amount}
          </p>

          <p>
            Payment ID:
            ${updatedPayment.razorpayPaymentId}
          </p>

          <hr />

          <h3>
            Event Details
          </h3>

          <p>
            📍 Pune
          </p>

          <p>
            📅 6 June 2026
          </p>

          <p>
            ⏰ 9 AM – 6 PM
          </p>

          <br />

          <p>
            We look forward to seeing you!
          </p>
        `
      );

      // ==================================================
      // 🔥 SUCCESS RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        message:
          "Payment verified successfully ✅",

        payment:
          updatedPayment
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Verification error ❌"
      });
    }
  };

// ======================================================
// 🔥 PAYMENT STATS
// ======================================================

export const getPaymentStats =
  async (req, res) => {

    try {

      // ==============================================
      // 🔥 TOTAL REVENUE
      // ==============================================

      const totalRevenue =
        await Payment.aggregate([

          {
            $match: {
              status: "paid"
            }
          },

          {
            $group: {

              _id: null,

              total: {
                $sum: "$amount"
              }
            }
          }
        ]);

      // ==============================================
      // 🔥 TOTAL PAID EXHIBITORS
      // ==============================================

      const totalPaidExhibitors =
        await Payment.countDocuments({

          status: "paid",

          role: "exhibitor"
        });

      // ==============================================
      // 🔥 PACKAGE COUNTS
      // ==============================================

      const packageStats =
        await Payment.aggregate([

          {
            $match: {
              status: "paid"
            }
          },

          {
            $group: {

              _id: "$packageType",

              count: {
                $sum: 1
              },

              revenue: {
                $sum: "$amount"
              }
            }
          }
        ]);

      // ==============================================
      // 🔥 RECENT PAYMENTS
      // ==============================================

      const recentPayments =
        await Payment.find({

          status: "paid"
        })

          .sort({
            createdAt: -1
          })

          .limit(5);

      // ==============================================
      // 🔥 RESPONSE
      // ==============================================

      res.status(200).json({

        success: true,

        totalRevenue:
          totalRevenue[0]?.total || 0,

        totalPaidExhibitors,

        packageStats,

        recentPayments
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch payment stats ❌"
      });
    }
  };