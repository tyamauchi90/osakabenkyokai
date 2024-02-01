import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
    apiVersion: "2023-10-16",
  });
  // const body = await req.arrayBuffer();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig) {
      throw new Error("No signature provided");
    }
    event = stripe.webhooks.constructEvent(
      // Buffer.from(body).toString("utf8"),
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    );

    if (event.type === "payment_intent.succeeded") {
      console.log("payment_intent.succeeded");
      // const { postId, userId } = event.data.object.metadata;
      // const userName = event.data.object.metadata.name;
      // // const userName = event.data.object.metadata!.userName;
      // // const existingApplicationDocData =
      // //   event.data.object.metadata?.existingApplicationDocData;
      // // const overwrite = event.data.object.metadata?.overwrite;

      // const postRef = firebaseAdmin.firestore().doc(`posts/${postId}`);
      // const postSnapshot = await postRef.get();
      // const postEventData = postSnapshot.data();

      // const applicationData = {
      //   postId,
      //   eventDate: postEventData?.eventDate || null,
      //   userId,
      //   userName: userName || "",
      //   applyDate: serverTimestamp(),
      //   isPaid: true,
      // };

      // const applicationsRef = postRef.collection("applications");

      // // try {
      // const applicationRef = applicationsRef.doc(userId);
      // // if (existingApplicationDocData && overwrite) {
      // await applicationRef.set(applicationData, { merge: true });
      // // } else if (!existingApplicationDocData) {
      // //   await applicationRef.set(applicationData);
      // // } else {
      // //   throw new Error("existingApplicationDocData is undefined");
      // // }
      // // } catch (error: any) {
      // //   console.error(error.message || error);
      // //   throw error;
      // // }

      return new NextResponse("応募データを追加しました", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
