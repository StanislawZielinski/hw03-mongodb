// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = (email, sender, verificationToken) => {
  return {
    to: email, // Change to your recipient
    from: sender, // Change to your verified sender
    subject: "Please confirm your email",
    html: `<div>Hi ${email}!</div><a href="http://localhost:3000/api//users/verify/${verificationToken}">confirm email</a>`,
  };
};

module.exports = msg;
