import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    // 本予約
    // const request = await req.json();
    // const { id, user, userName } = request;

    // チェックアウトセッション作成
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      // success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      payment_method_types: ["card"],
      mode: "payment",
      // metadata: {
      //   id,
      //   userId: user.uid,
      //   userName: userName,
      // },
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_KEY,
          quantity: 1,
        },
      ],
    });

    return new NextResponse(JSON.stringify({ sessionId: checkoutSession.id }));
  } catch (error: any) {
    console.error("Stripeエラー:", error.message);
    return new NextResponse("Stripeでエラーが発生しました", { status: 500 });
  }
}
