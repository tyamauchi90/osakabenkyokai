import { firebaseAdmin } from "@/firebase/admin";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers?.get("stripe-signature");
  const rawBody = await req.text();
  console.log(sig, rawBody);

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

    if (event.type === "payment_intent.succeeded") {
      // const sessionId = event.data.object.id;
      const postId = event.data.object.metadata?.postId;
      const userId = event.data.object.metadata?.userId;
      const userName = event.data.object.metadata?.userName;
      // const existingApplicationDocData =
      //   event.data.object.metadata?.existingApplicationDocData;
      // const overwrite = event.data.object.metadata?.overwrite;

      console.log(
        postId,
        userId,
        userName
        // existingApplicationDocData,
        // overwrite
      );

      const postRef = firebaseAdmin.firestore().doc(`posts/${postId}`);
      const postSnapshot = await postRef.get();
      const postEventData = postSnapshot.data();

      const applicationData = {
        postId,
        eventDate: postEventData?.eventDate || null,
        userId,
        userName: userName,
        applyDate: Timestamp.now(),
        isPaid: true,
      };

      const applicationsRef = postRef.collection("applications");

      try {
        const applicationRef = applicationsRef.doc(userId);
        // if (existingApplicationDocData && overwrite) {
        await applicationRef.set(applicationData);
        // } else if (!existingApplicationDocData) {
        //   await applicationRef.set(applicationData);
        // } else {
        //   throw new Error("existingApplicationDocData is undefined");
        // }
      } catch (error: any) {
        console.error(error.message || error);
        throw error;
      }
    }

    return new NextResponse("応募データを追加しました", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// import { User } from "firebase/auth";
// import { Timestamp } from "firebase/firestore";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { firebaseAdmin } from "../../../../../firebase/admin";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: NextRequest) {
//   const sig = req.headers?.get("stripe-signature");
//   const rawBody = await req.text();

//   const request = JSON.parse(rawBody);

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
//     try {
//     const addData = async function (
//       postId: string,
//       user: User,
//       userName: string,
//       existingApplicationDocData: any,
//       overwrite: boolean
//     ) {
//       const postRef = firebaseAdmin.firestore().doc(`posts/${postId}`);
//       const postSnapshot = await postRef.get();
//       const postEventData = postSnapshot.data();

//       const applicationData = {
//         postId,
//         eventDate: postEventData?.eventDate || null,
//         userId: user?.uid,
//         userName: userName,
//         applyDate: Timestamp.now(),
//         isPaid: true,
//       };

//       const applicationsRef = postRef.collection("applications");

//       try {
//         const applicationRef = applicationsRef.doc(user.uid);
//         if (existingApplicationDocData && overwrite) {
//           await applicationRef.set(applicationData);
//         } else if (!existingApplicationDocData) {
//           await applicationRef.set(applicationData);
//         } else {
//           throw new Error("existingApplicationDocData is undefined");
//         }
//       } catch (error: any) {
//         console.error(error.message || error);
//         throw error;
//       }
//     };

//     await addData(
//       postId,
//       user,
//       userName,
//       existingApplicationDocData,
//       overwrite
//     );

//     return new NextResponse("Form data received", {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     } catch (error: any) {
//       console.error(error.message || error);
//       return new NextResponse(
//         JSON.stringify({
//           error: "ポスト処理が異常終了しました。",
//         }),
//         {
//           status: 500,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//     }
//   } catch (err: any) {
//     console.error(`Webhook Error: ${err.message}`);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }
// }
