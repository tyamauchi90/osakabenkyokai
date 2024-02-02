// import cors from "cors";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import Stripe from "stripe";

admin.initializeApp();

// const corsHandler = cors({origin: true});

type StripeEvent = {
  type: string;
  data: {
    object: {
      metadata?: {
        postId: string;
        userId: string;
        userName: string;
      };
    };
  };
};

type PostEventData = {
  eventDate: Date | null;
};

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: "2023-10-16",
});

export const stripePaymentSucceeded = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    // corsHandler(req, res, async () => {
    try {
      const sig = req.headers["stripe-signature"];
      if (!sig) {
        throw new Error("No signature provided");
      }

      const event: Stripe.Event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        functions.config().stripe.webhook_secret
      );

      const stripeEvent = event as StripeEvent;

      if (stripeEvent.type === "payment_intent.succeeded") {
        const paymentIntent = stripeEvent.data.object;
        const postId = paymentIntent.metadata?.postId;
        const userId = paymentIntent.metadata?.userId;
        const userName = paymentIntent.metadata?.userName;

        if (!postId || !userId || !userName) {
          throw new Error("Metadata is missing");
        }

        const postRef = admin.firestore().doc(`posts/${postId}`);
        const postSnapshot = await postRef.get();
        const postEventData = postSnapshot.data() as PostEventData;

        const applicationData = {
          postId,
          eventDate: postEventData?.eventDate || null,
          userId,
          userName,
          applyDate: admin.firestore.Timestamp.now(),
          isPaid: true,
        };

        const applicationsRef = postRef.collection("applications");
        const applicationRef = applicationsRef.doc(userId);
        await applicationRef.set(applicationData, {merge: true});
      }

      res.sendStatus(200);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error);
      }
      res.sendStatus(500);
    }
    // });
  }
);
