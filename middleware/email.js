const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLEINT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendMail = async (email, html, subject) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_ID,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLEINT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        const mailOptions = {
            from: `${process.env.USER_NAME} <${process.env.EMAIL_ID}>`,
            to: email,
            subject: subject,
            text: 'FYP Expert System',
            html: html,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendMail