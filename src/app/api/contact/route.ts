import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendEmail, contactFormEmailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, phone, subject, message } = result.data;

    await prisma.contactRequest.create({
      data: { name, email, phone, subject, message },
    });

    await sendEmail({
      to: process.env.EMAIL_FROM!,
      subject: `Contact: ${subject}`,
      html: contactFormEmailTemplate(name, email, subject, message),
    }).catch(console.error);

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
