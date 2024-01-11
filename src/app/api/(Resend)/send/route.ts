import { NextResponse } from "next/server";
import { Resend } from "resend";
import Email from "../../../../../emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      // from: "ぺこぽん <pecopon24@gmail.com>",
      from: "Acme <onboarding@resend.dev>",
      to: ["pecopon24@gmail.com"],
      subject: "Hello world",
      // react: EmailTemplate({ firstName: "John" }),
      react: Email(),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
