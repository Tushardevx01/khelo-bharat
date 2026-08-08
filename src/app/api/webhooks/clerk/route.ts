import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { userService } from "@/services/user.service";
import { errorResponse, successResponse } from "@/lib/api-response";
import { ValidationError } from "@/lib/errors";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

async function handleWebhook(event: { type: string; data: Record<string, unknown> }) {
  const eventType = event.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const email = (email_addresses as Array<{ email_address: string }>)?.[0]?.email_address;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";

    if (email) {
      await userService.getOrCreateUser({
        clerkId: id as string,
        email,
        name,
        avatar: image_url as string || undefined,
      });
    }
  }

  if (eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses } = event.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";
    const email = (email_addresses as Array<{ email_address: string }>)?.[0]?.email_address;

    try {
      const user = await userService.getUserByClerkId(id as string);
      await userService.getOrCreateUser({
        clerkId: user.clerkId,
        email: email || user.email,
        name,
        avatar: (image_url as string | undefined) || user.avatar || undefined,
        role: user.role,
      });
    } catch (error) {
      // A missed create event is recovered only when Clerk gave us a complete identity.
      if (email) {
        await userService.getOrCreateUser({
          clerkId: id as string,
          email,
          name,
          avatar: image_url as string | undefined,
        });
        return;
      }
      throw error;
    }
  }

  if (eventType === "user.deleted") {
    const clerkId = event.data.id as string | undefined;
    if (clerkId) await userService.deleteUserByClerkId(clerkId);
  }
}

export async function POST(request: NextRequest) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return errorResponse(new ValidationError("Missing webhook signature"));
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { success: false, error: { code: "WEBHOOK_NOT_CONFIGURED", message: "Webhook is unavailable" } },
      { status: 503 },
    );
  }

  const body = await request.text();

  const wh = new Webhook(webhookSecret);
  let evt: { type: string; data: Record<string, unknown> };

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as { type: string; data: Record<string, unknown> };
  } catch {
    return errorResponse(new ValidationError("Invalid webhook signature"));
  }

  try {
    await handleWebhook(evt);
    return successResponse({ received: true });
  } catch (error) {
    return errorResponse(error);
  }
}
