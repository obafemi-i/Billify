
const sgMail = require("@sendgrid/mail");
const twilio = require('twilio');

// const SendEmailOld = async (Payloads, mailBody, subject = "Welcome Onboard") =>
//   new Promise(async (resolve, reject) => {
//     console.log(Payloads, "pppppppp>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//     var data = {
//       // from: "Smartrick <me@samples.mailgun.org>",
//       from: "Maya from Noisystreetss <hello@noisystreetss.com>",
//       // to: "hashdavies@gmail.com",
//       to: Payloads.userEmail,
//       // to: "tifeblakez1@gmail.com",
//       bcc: "hashdavies@gmail.com",
//       subject: subject,
//       // text: "Testing some Mailgun awesomeness!",
//       html: mailBody,
//     };

//     mailgun.messages().send(data, function (error, body) {
//       console.log(body, "success mail");
//       console.log(error, "errormail");
//     });
//     if (error) {
//       reject(false);
//     } else {
//       resolve(true);
//     }
//   });

const SendEmail = async (Payloads, mailBody, subject = "Welcome Onboard") =>
  new Promise(async (resolve, reject) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: Payloads.userEmail,
      from: {
        email: process.env.SENDGRID_FROM_MAIL,
        name: process.env.Email_FROM_NAME,
      }, // Use the email address or domain you verified above
      subject: subject,
      // text: "and easy to do anywhere, even with Node.js",
      html: mailBody,
      bcc: "hashdavies@gmail.com",
    };

    sgMail.send(msg).then(
      (response) => {
        console.log(response, "SendGrid response");
        resolve(true);
      },
      (error) => {
        console.error(error, "SendGrid");

        if (error.response) {
          console.error(error.response.body);
          reject(false);
        }
      }
    );

    console.log(Payloads, "pppppppp>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    var data = {
      // from: "Smartrick <me@samples.mailgun.org>",
      from: "Maya from Noisystreetss <hello@noisystreetss.com>",
      // to: "hashdavies@gmail.com",
      to: Payloads.userEmail,
      // to: "tifeblakez1@gmail.com",
      bcc: "hashdavies@gmail.com",
      subject: subject,
      // text: "Testing some Mailgun awesomeness!",
      html: mailBody,
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body, "success mail");
      console.log(error, "errormail");
    });
    if (error) {
      reject(false);
    } else {
      resolve(true);
    }
});

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function sendSMS(to, body) {
  try {
    await client.messages.create({
      body,
      from: TWILIO_PHONE_NUMBER,
      to,
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS.');
  }
}

module.exports = { SendEmail, sendSMS };
