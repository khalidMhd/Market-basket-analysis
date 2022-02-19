const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const nodemailer = require("nodemailer");

// These id's and secrets should come from .env file.
const CLIENT_ID = '577765959532-v93tmd8o0bblimrrdle2umo2tljv19b7.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04nDOJTdQfpZMCgYIARAAGAQSNwF-L9IrDQUbou5xzhQK3eo7TGc4wgUJdlOnV2JOikA1KwyhH2FjqnGpKNu6XmfCv2SqR6z49aM';
const EMAIL_ID = 'webdev1137@gmail.com';
const NAME = 'Khalid Mehmood';

const output = `
  <h1>New Messsage!<h1>
  <p>I hope this works.</p>
`;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   type: "OAuth2",    // defining the authentication type
   clientId: CLIENT_ID,  // this will be obtained in part 2
   clientSecret: CLEINT_SECRET,    // this will be obtained in part 2     
  },
});

let mailOptions = {
  from: EMAIL_ID,   // You can change this to whatever you like. !this is NOT where you add in the email address!
  to: "khalidmhd1137@gmail.com",    // Use your same googele email ("send yourself an email") to test if the app works.
  subject: "Testing123...",   // change the subject to whatever you like.
  html: output,   // this is the output variable defined earlier that contains our message.
  auth: {
   user: EMAIL_ID,   // replace this with your google email
   refreshToken: REFRESH_TOKEN,    // this will be obtained in part 2 
   accessToken: "ya29.A0ARrdaM8znpaUZwp3eXZCvMqmGEN1Qnb5UM7qVoFAoNBTnyR5HJJ57g_zzob1NYj8UyHmLCF_4rCa1POTk2GTefYPXfIF2zdu5AhjyhG48T6Pj8ltdcmWV3i1epn6B-iNdY5Mj8osjSxX63ZmikwDJTJO6nWg",    // this will be obtained in part 2 
   expires: new Date().getTime(),  // this will request a new token each time so that it never expires. google allows up to 10,000 requests per day for free.
  },
};

transporter.sendMail(mailOptions, (error, info) => {  
  if (error) {
    console.log(error);   // if anything goes wrong an error will show up in your terminal.
  } else {
      console.log("Message sent: %s", info.messageId);    // if it's a success, a confirmation will show up in your terminal.
    }
});


module.exports = router
