import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const certificates = await prisma.certificate.findMany({
      where: { recipientId: session.userId },
      orderBy: { issuedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: certificates });
  } catch (error) {
    console.error("Get certificates error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
