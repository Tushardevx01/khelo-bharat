import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { tournamentSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get("sport");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: any = {};
    if (sport) where.sport = { name: sport };
    if (status) where.status = status;

    const [tournaments, total] = await Promise.all([
      prisma.tournament.findMany({
        where,
        include: { sport: true, organizer: { select: { name: true, avatar: true } }, _count: { select: { registrations: true } } },
        orderBy: { startDate: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.tournament.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: tournaments,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Get tournaments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const result = tournamentSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });

    const data = result.data;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const tournament = await prisma.tournament.create({
      data: {
        ...data,
        slug,
        organizerId: session.userId,
        organizerType: "ADMIN",
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        registrationDeadline: new Date(data.registrationDeadline),
      },
      include: { sport: true },
    });

    return NextResponse.json({ success: true, data: tournament }, { status: 201 });
  } catch (error) {
    console.error("Create tournament error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
