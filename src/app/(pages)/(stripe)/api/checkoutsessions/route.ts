import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const { postId, userId } = await req.json();
  let checkoutSession;
  try {
    // チェックアウトセッション作成
    checkoutSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_KEY,
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          postId,
          userId,
        },
      },
    });
  } catch (error: any) {
    console.error("Stripeエラー:", error);
    return new NextResponse("Stripeでエラーが発生しました", { status: 500 });
  }

  return new NextResponse(JSON.stringify({ sessionId: checkoutSession.id }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
