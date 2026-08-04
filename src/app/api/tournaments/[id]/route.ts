import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        sport: true,
        organizer: { select: { name: true, avatar: true } },
        registrations: { include: { participant: { select: { name: true, avatar: true } } } },
        fixtures: true,
        _count: { select: { registrations: true } },
      },
    });

    if (!tournament) return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: tournament });
  } catch (error) {
    console.error("Get tournament error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const tournament = await prisma.tournament.update({ where: { id }, data: body, include: { sport: true } });
    return NextResponse.json({ success: true, data: tournament });
  } catch (error) {
    console.error("Update tournament error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.tournament.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Tournament deleted" });
  } catch (error) {
    console.error("Delete tournament error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
