import { auth, currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";
import { userService } from "@/services/user.service";

/** Resolves the signed-in Clerk identity to the server-owned business user. */
export async function requireCurrentUser() {
  const { userId } = await auth();
  if (!userId) throw new UnauthorizedError();

  const user = await userService.getUserByClerkId(userId);
  if (!user.isActive || user.deletedAt) {
    throw new ForbiddenError("This account is unavailable");
  }
  return user;
}

/** Creates the business user only from the authenticated Clerk identity. */
export async function resolveCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new UnauthorizedError();

  const email = clerkUser.primaryEmailAddress?.emailAddress;
  if (!email) throw new UnauthorizedError("A verified email address is required");

  return userService.getOrCreateUser({
    clerkId: clerkUser.id,
    email,
    name: clerkUser.fullName || clerkUser.firstName || "Member",
    avatar: clerkUser.imageUrl,
  });
}

export async function requireRole(...roles: UserRole[]) {
  const user = await requireCurrentUser();
  if (!roles.includes(user.role)) {
    throw new ForbiddenError("You do not have permission to perform this action");
  }
  return user;
}
