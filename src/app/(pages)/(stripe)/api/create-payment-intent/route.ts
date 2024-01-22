import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "stripe-samples/accept-a-payment",
    url: "https://github.com/stripe-samples",
    version: "0.0.2",
  },
  typescript: true,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const params: Stripe.PaymentIntentCreateParams = {
      amount: 1000,
      currency: "jpy",
      automatic_payment_methods: {
        enabled: true,
      },
    };

    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params);

    return new NextResponse(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
//   appInfo: {
//     name: "stripe-samples/accept-a-payment",
//     url: "https://github.com/stripe-samples",
//     version: "0.0.2",
//   },
//   typescript: true,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const params: Stripe.PaymentIntentCreateParams = {
//         amount: 1000,
//         currency: "jpy",
//         automatic_payment_methods: {
//           enabled: true,
//         },
//       };

//       const paymentIntent: Stripe.PaymentIntent =
//         await stripe.paymentIntents.create(params);

//       res.status(200).json({
//         clientSecret: paymentIntent.client_secret,
//       });
//     } catch (err: unknown) {
//       res.status(500).json({ statusCode: 500, message: err.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
