import { User } from "firebase/auth";
import { Timestamp, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { firebaseAdmin } from "../../../../../firebase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// POST : 本予約
export async function POST(req: NextRequest) {
  // const contentType = req.headers.get("content-type");
  // if (contentType !== "application/json") {
  //   console.error("Content-Typeがapplication/jsonではありません。");
  //   return new NextResponse("Invalid Content-Type", { status: 400 });
  // }

  const sig = req.headers?.get("stripe-signature");
  const rawBody = await req.text();

  // JSONデータを解析
  const request = JSON.parse(rawBody);
  // const { id, user, userName } = request;
  const { id, user, userName, existingApplicationDocData, overwrite } = request;

  // if (!id || !user || !userName) {
  //   console.error("Required data is missing.");
  //   return new NextResponse("Required data is missing", { status: 400 });
  // }

  let event;

  try {
    if (!sig) {
      throw new Error("No signature provided");
    }
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      try {
        const addData = async function (
          id: string,
          user: User,
          userName: string,
          existingApplicationDocData: any,
          overwrite: boolean
        ) {
          const postRef = firebaseAdmin.firestore().doc(`posts/${id}`);
          const postSnapshot = await postRef.get();
          const postEventData = postSnapshot.data();

          const applicationData = {
            eventDate: postEventData?.eventDate || null,
            userId: user?.uid,
            userName: userName,
            applyDate: Timestamp.now(),
            isPaid: true,
          };

          const applicationRef = collection(postRef, "applications");

          try {
            if (existingApplicationDocData && overwrite) {
              // データが存在し、上書きが許可されている場合、上書き
              const existingApplicationRef = firebaseAdmin
                .firestore()
                .doc(`posts/${id}/applications/${user.uid}`);
              await existingApplicationRef.set(applicationData);
            } else if (!existingApplicationDocData) {
              // データが存在しない場合、新規登録
              const newApplicationRef = firebaseAdmin
                .firestore()
                .doc(`posts/${id}/applications/${user.uid}`);
              await newApplicationRef.set(applicationData);
            } else {
              // existingApplicationDocData が undefined の場合のエラーハンドリング
              console.error("existingApplicationDocData is undefined");
              throw new Error("existingApplicationDocData is undefined");
            }

            return new NextResponse(
              JSON.stringify({ message: "Form data received" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          } catch (error: any) {
            console.error(error.message || error);
            return new NextResponse(
              JSON.stringify({
                error: "ポスト処理が異常終了しました。",
              }),
              {
                status: 500,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        };
        await addData(
          id,
          user,
          userName,
          existingApplicationDocData,
          overwrite
        );

        return new NextResponse("Form data received", {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error: any) {
        console.error(error.message || error);
        return new NextResponse(
          JSON.stringify({
            error: "ポスト処理が異常終了しました。",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// import { User } from "firebase/auth";
// import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { db } from "../../../../../firebase/client";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// // POST : 本予約
// export async function POST(req: NextRequest) {
//   // const contentType = req.headers.get("content-type");
//   // if (contentType !== "application/json") {
//   //   console.error("Content-Typeがapplication/jsonではありません。");
//   //   return new NextResponse("Invalid Content-Type", { status: 400 });
//   // }

//   const sig = req.headers?.get("stripe-signature");
//   const rawBody = await req.text();

//   // JSONデータを解析
//   const request = JSON.parse(rawBody);
//   // const { id, user, userName } = request;
//   const { id, user, userName, existingApplicationDocData, overwrite } = request;

//   // if (!id || !user || !userName) {
//   //   console.error("Required data is missing.");
//   //   return new NextResponse("Required data is missing", { status: 400 });
//   // }

//   let event;

//   try {
//     if (!sig) {
//       throw new Error("No signature provided");
//     }
//     event = stripe.webhooks.constructEvent(
//       rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );

//     if (event.type === "checkout.session.completed") {
//       try {
//         const addData = async function (
//           id: string,
//           user: User,
//           userName: string,
//           existingApplicationDocData: any,
//           overwrite: boolean
//         ) {
//           const postRef = doc(db, "posts", id);
//           const postSnapshot = await getDoc(postRef);
//           const postEventData = postSnapshot.data();

//           const applicationData = {
//             eventDate: postEventData?.eventDate || null,
//             userId: user?.uid,
//             userName: userName,
//             applyDate: Timestamp.now(),
//             isPaid: true,
//           };

//           const applicationRef = collection(postRef, "applications");

//           try {
//             if (existingApplicationDocData && overwrite) {
//               // データが存在し、上書きが許可されている場合、上書き
//               const existingApplicationRef = doc(applicationRef, user.uid);
//               await setDoc(existingApplicationRef, applicationData);
//             } else if (!existingApplicationDocData) {
//               // データが存在しない場合、新規登録
//               const newApplicationRef = doc(applicationRef, user.uid);
//               await setDoc(newApplicationRef, applicationData);
//             } else {
//               // existingApplicationDocData が undefined の場合のエラーハンドリング
//               console.error("existingApplicationDocData is undefined");
//               throw new Error("existingApplicationDocData is undefined");
//             }

//             return new NextResponse(
//               JSON.stringify({ message: "Form data received" }),
//               {
//                 status: 200,
//                 headers: { "Content-Type": "application/json" },
//               }
//             );
//           } catch (error: any) {
//             console.error(error.message || error);
//             return new NextResponse(
//               JSON.stringify({
//                 error: "ポスト処理が異常終了しました。",
//               }),
//               {
//                 status: 500,
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             );
//           }
//         };
//         await addData(
//           id,
//           user,
//           userName,
//           existingApplicationDocData,
//           overwrite
//         );

//         return new NextResponse("Form data received", {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       } catch (error: any) {
//         console.error(error.message || error);
//         return new NextResponse(
//           JSON.stringify({
//             error: "ポスト処理が異常終了しました。",
//           }),
//           {
//             status: 500,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       }
//     }
//   } catch (err: any) {
//     console.error(`Webhook Error: ${err.message}`);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }
// }
