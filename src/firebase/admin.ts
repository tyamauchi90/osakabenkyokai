// import { credential, initializeApp } from "firebase-admin";
// import { getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// if (!getApps()?.length) {
//   initializeApp({
//     credential: credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// export const adminDB = getFirestore();
const admin = require("firebase-admin");
const serviceAccount = require("../../admin.json");

// 既に初期化されているかどうかをチェックする
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firebaseAdmin = admin;
export { firebaseAdmin };
