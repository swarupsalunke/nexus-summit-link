import nodemailer from "nodemailer";

// ======================================================
// 🔥 SEND EMAIL FUNCTION
// ======================================================

const sendEmail = async (

  to,

  subject,

  text

) => {

  try {

    // ==================================================
    // 🔥 TRANSPORTER
    // ==================================================

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS
        }
      });

    // ==================================================
    // 🔥 EMAIL OPTIONS
    // ==================================================

    const mailOptions = {

      from:
        process.env.EMAIL_USER,

      to,

      subject,

      text
    };

    // ==================================================
    // 🔥 SEND MAIL
    // ==================================================

    await transporter.sendMail(
      mailOptions
    );

    console.log(
      "Email sent successfully ✅"
    );

  } catch (error) {

    console.log(
      "Email error:",
      error
    );  
  }
};

export default sendEmail;