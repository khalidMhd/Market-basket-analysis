const nodemailer = require('nodemailer')
const { google } = require('googleapis')

// These id's and secrets should come from .env file.
const CLIENT_ID = '577765959532-v93tmd8o0bblimrrdle2umo2tljv19b7.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04ilRUAJ3FB8nCgYIARAAGAQSNwF-L9Ir6tfFRyCFQwZgvBdYLBEalABQabd3UIaGU99WJ0iymDG_h_kdatfU8RzJjO5Q9PVrb1k';
const EMAIL_ID = 'webdev1137@gmail.com';
const NAME = 'khalid mehmood';

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