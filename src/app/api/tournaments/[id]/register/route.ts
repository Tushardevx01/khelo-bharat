import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { sendEmail, tournamentRegistrationEmailTemplate } from "@/lib/email";
import { createNotification } from "@/lib/notifications";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const tournament = await prisma.tournament.findUnique({ where: { id } });
    if (!tournament) return NextResponse.json({ error: "Tournament not found" }, { status: 404 });

    const existing = await prisma.tournamentRegistration.findFirst({
      where: { tournamentId: id, participantId: session.userId },
    });
    if (existing) return NextResponse.json({ error: "Already registered" }, { status: 409 });

    const registration = await prisma.tournamentRegistration.create({
      data: { tournamentId: id, participantId: session.userId, participantType: "ATHLETE" },
    });

    await createNotification({
      userId: session.userId,
      title: "Tournament Registration",
      message: `You have been registered for ${tournament.title}`,
      type: "SUCCESS",
      link: `/tournaments/${id}`,
    });

    sendEmail({
      to: session.email,
      subject: `Registration Confirmed - ${tournament.title}`,
      html: tournamentRegistrationEmailTemplate(session.name, tournament.title),
    }).catch(console.error);

    return NextResponse.json({ success: true, data: registration }, { status: 201 });
  } catch (error) {
    console.error("Register tournament error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
