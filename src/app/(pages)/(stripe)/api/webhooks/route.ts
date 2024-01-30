import { User } from "firebase/auth";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "../../../../../firebase/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const addData = async function (id: string, user: User, userName: string) {
  const postRef = doc(db, "posts", id);
  const postSnapshot = await getDoc(postRef);
  const postEventData = postSnapshot.data();

  const applicationData = {
    eventDate: postEventData?.eventDate || null,
    userId: user?.uid,
    userName: userName,
    applyDate: Timestamp.now(),
    isPaid: true,
  };
  const applicationRef = collection(postRef, "applications");
  await addDoc(applicationRef, applicationData);
};

// POST : 本予約
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  if (contentType !== "application/json") {
    console.error("Content-Typeがapplication/jsonではありません。");
    return new NextResponse("Invalid Content-Type", { status: 400 });
  }

  const sig = req.headers?.get("stripe-signature");
  const rawBody = await req.text();

  // JSONデータを解析
  const request = JSON.parse(rawBody);
  const { id, user, userName } = request;

  if (!id || !user || !userName) {
    console.error("Required data is missing.");
    return new NextResponse("Required data is missing", { status: 400 });
  }

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
        await addData(id, user, userName);

        return new NextResponse("Form data received", {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (firestoreError) {
        console.error(`Firestore Error: ${firestoreError}`);
        return new NextResponse("Failed to save data to Firestore", {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// import { User } from "firebase/auth";
// import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { db } from "../../../../../firebase/client";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// // export const routeConfig = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // POST : 本予約
// export async function POST(req: NextRequest) {
//   const contentType = req.headers.get("content-type");
//   if (contentType !== "application/json") {
//     console.error("Content-Typeがapplication/jsonではありません。");
//     return new NextResponse("Invalid Content-Type", { status: 400 });
//   }

//   const sig = req.headers?.get("stripe-signature");
//   const rawBody = await req.text();

//   // JSONデータを解析
//   const request = JSON.parse(rawBody);
//   const { id, user, userName } = request;

//   if (!id) {
//     console.error("IDが未定義です。");
//     return;
//   }

//   if (!user) {
//     console.error("ユーザーが存在しません。");
//     return;
//   }

//   let event;

//   console.log(sig);

//   try {
//     if (!sig) {
//       throw new Error("No signature provided");
//     }
//     event = stripe.webhooks.constructEvent(
//       rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err: any) {
//     console.error(`Webhook Error: ${err.message}`);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     // const session = event.data.object as Stripe.Checkout.Session;

//     const addData = async function (id: string, user: User, userName: string) {
//       const postRef = doc(db, "posts", id);
//       const postSnapshot = await getDoc(postRef);
//       const postEventData = postSnapshot.data();

//       const applicationData = {
//         eventDate: postEventData?.eventDate || null,
//         userId: user?.uid,
//         userName: userName,
//         applyDate: Timestamp.now(),
//         isPaid: true,
//       };
//       const applicationRef = collection(postRef, "applications");
//       await addDoc(applicationRef, applicationData);
//     };
//     try {
//       await addData(id, user, userName);

//       return new NextResponse(
//         JSON.stringify({ message: "Form data received" }),
//         {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (firestoreError) {
//       console.error(`Firestore Error: ${firestoreError}`);
//       return new NextResponse(
//         JSON.stringify({ error: "Failed to save data to Firestore" }),
//         {
//           status: 500,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//   }
// }
