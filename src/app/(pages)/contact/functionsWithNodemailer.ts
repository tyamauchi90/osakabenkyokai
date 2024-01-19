import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// 本番環境（デプロイ時）はFirebaseの環境設定から設定値を読み込む
// ToDo:firebase functions:config:set email.account="your-email@example.com"
//                                    email.password="your-password"
// const gmailEmail = process.env.GMAIL_EMAIL
//                     || functions.config().email.account;
// const gmailPassword =
//   process.env.GMAIL_PASSWORD || functions.config().email.password;
// const gmailEmail = process.env.GMAIL_EMAIL;
// const gmailPassword = process.env.GMAIL_PASSWORD;

// SMTPの設定
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

exports.sendEmailNotification = functions.firestore
  .document("contacts/{docId}")
  .onCreate(async (snap) => {
    const data = snap.data(); // 追加されたドキュメントのデータを取得

    if (data && "email" in data && "name" in data && "message" in data) {
      // メールのオプションを設定
      const mailOptions: nodemailer.SendMailOptions = {
        from: `${data.email}`,
        to: process.env.GMAIL_EMAIL,
        subject: "【おおさか勉強会】新しいお問合せがありました",
        text: `Name: ${data.name}\n
        Email: ${data.email}\n
        Message: ${data.message}`,
      };

      try {
        const info = await transporter.sendMail(mailOptions); // メール送信
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    } else {
      console.error("Email, name, and message must be provided");
    }
  });
