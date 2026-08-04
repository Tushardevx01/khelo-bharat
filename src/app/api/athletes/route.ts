import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get("sport");
    const city = searchParams.get("city");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: any = { user: { role: "ATHLETE" } };
    if (sport) where.sports = { contains: sport, mode: "insensitive" };
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (search) where.user = { name: { contains: search, mode: "insensitive" } };

    const [athletes, total] = await Promise.all([
      prisma.athleteProfile.findMany({
        where,
        include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
        orderBy: { ranking: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.athleteProfile.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: athletes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Get athletes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
