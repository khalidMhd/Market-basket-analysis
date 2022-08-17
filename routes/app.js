const express = require('express')
const router = express.Router()
const nodeMailer = require("nodemailer");

SMPT_SERVICE = "gmail";
SMPT_EMAIL = "webdev1137@gmail.com";
SMPT_PASSWORD = "@Khalidmhd2115";
SMPT_HOST = "smtp.gmail.com";
SMPT_PORT = 587;

const sendEmail = async (options) => {

  const transporter = nodeMailer.createTransport({

    host: SMPT_HOST,
    port: SMPT_PORT,
    secure: false,
    requireTLS: true,
    service: SMPT_SERVICE,
    auth: {
      user: SMPT_EMAIL,
      pass: SMPT_PASSWORD
    }
  })

  const mailOptions = {
    from: "iqrashaheen326@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

//  sendEmail({
//   email: "khalidmhd1137@gmail.com",
//   subject: ` Password Recovery`,
//   message: "test message"
// });





module.exports = router
