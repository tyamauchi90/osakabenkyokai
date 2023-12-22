const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendEmail = functions.firestore
  .document("contacts/{docId}")
  .onCreate((snap, context) => {
    const data = snap.data();

    const msg = {
      to: "your-email@example.com",
      from: "no-reply@example.com",
      subject: "New Contact Form Submission",
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
    };

    return sgMail.send(msg);
  });
