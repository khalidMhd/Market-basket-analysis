const nodemailer = require('nodemailer')
const { google } = require('googleapis')

// These id's and secrets should come from .env file.
const CLIENT_ID = '';
const CLEINT_SECRET = '';
const REDIRECT_URI = '';
const REFRESH_TOKEN = '';
const EMAIL_ID = '';
const NAME = '';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (email, html, subject) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_ID,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `${NAME} <${EMAIL_ID}>`,
      to: email,
      subject: subject,
      text: 'Expert system',
      html: html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail
