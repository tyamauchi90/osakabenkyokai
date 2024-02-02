import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

const gmailEmail = process.env.GMAIL_EMAIL || functions.config().gmail.email;
const gmailPassword =
  process.env.GMAIL_PASSWORD || functions.config().gmail.pass;

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const sendEmailNotification = functions.firestore
  .document("/contacts/{docId}")
  .onCreate(async (snap) => {
    const data = snap.data();

    if (data && "email" in data && "name" in data && "message" in data) {
      const mailOptions: nodemailer.SendMailOptions = {
        from: `${data.email}`,
        to: gmailEmail,
        subject: "【おおさか勉強会】新しいお問合せがありました",
        text: `名前: ${data.name}\nメール: ${data.email}\n内容: ${data.message}`,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    } else {
      console.error("Email, name, and message must be provided");
    }
  });
