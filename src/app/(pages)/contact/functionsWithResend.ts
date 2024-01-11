import { CallableContext } from "firebase-functions/v1/https";

const functions = require("firebase-functions");
const resend = require("@resend/resend");

resend.setApiKey(functions.config().resend.key);

exports.sendEmail = functions.firestore
  .document("contacts/{docId}")
  .onCreate((snap, context: CallableContext) => {
    const data = snap.data();

    const msg = {
      to: "pecopon24@gmail.com",
      from: "pecopon24@gmail.com",
      subject: "【おおさか勉強会】新しいお問合せがありました",
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
    };

    return resend.send(msg);
  });
