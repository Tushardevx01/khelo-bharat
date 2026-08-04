import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { markAllAsRead } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await markAllAsRead(session.userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
