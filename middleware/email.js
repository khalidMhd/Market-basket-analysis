const nodeMailer = require('nodemailer')

SMPT_SERVICE = "gmail";
SMPT_EMAIL = "webdev1137@gmail.com";
SMPT_PASSWORD = "@Khalidwebdev21";
SMPT_HOST = "smtp.gmail.com";
SMPT_PORT = 587;

const sendMail = async (email, html, subject) => {
  try {
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
      from: "webdev1137@gmail.com",
      to: email,
      subject: subject,
      text: 'Expert system',
      html: html,
    }

    const result = await transporter.sendMail(mailOptions);
    return result;

  } catch (error) {
    return error;
  }
};

module.exports = sendMail