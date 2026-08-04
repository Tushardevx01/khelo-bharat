import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken, setSessionCookie } from "@/lib/auth";
import { registerSchema } from "@/lib/validations";
import { sendEmail, welcomeEmailTemplate } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit("register", 5, 60000)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, password, phone, role } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: role as any,
      },
    });

    // Create role-specific profile
    if (role === "ATHLETE") {
      await prisma.athleteProfile.create({ data: { userId: user.id } });
    } else if (role === "SCHOOL_ADMIN") {
      await prisma.schoolProfile.create({ data: { userId: user.id, name: "", type: "SCHOOL", address: "", city: "", state: "" } });
    } else if (role === "COACH") {
      await prisma.coachProfile.create({ data: { userId: user.id } });
    } else if (role === "SPONSOR") {
      await prisma.sponsorProfile.create({ data: { userId: user.id, companyName: "" } });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    await setSessionCookie(token);

    // Send welcome email (don't block response)
    sendEmail({ to: email, subject: "Welcome to Khelo Bharat!", html: welcomeEmailTemplate(name) }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
