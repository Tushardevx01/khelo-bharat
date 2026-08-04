import { userRepository } from "@/features/auth/repositories/user.repository";
import { hashPassword, verifyPassword, generateToken, setSessionCookie } from "@/lib/auth";
import { sendEmail, emailTemplates } from "@/lib/email";
import { ConflictError, NotFoundError, UnauthorizedError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import type { UserPayload } from "@/types";

export const userService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
  }) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    // Create role-specific profile
    switch (data.role) {
      case "ATHLETE":
        await userRepository.createAthleteProfile(user.id);
        break;
      case "SCHOOL_ADMIN":
        await userRepository.createSchoolProfile(user.id, {
          name: "",
          type: "SCHOOL",
          address: "",
          city: "",
          state: "",
        });
        break;
      case "COACH":
        await userRepository.createCoachProfile(user.id);
        break;
      case "SPONSOR":
        await userRepository.createSponsorProfile(user.id);
        break;
    }

    const token = await generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    await setSessionCookie(token);

    // Send welcome email asynchronously
    sendEmail({
      to: user.email,
      subject: "Welcome to Khelo Bharat!",
      html: emailTemplates.welcome(user.name),
    }).catch((error) => logger.error("Failed to send welcome email", error));

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  },

  async login(data: { email: string; password: string }) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValid = await verifyPassword(data.password, user.password);
    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = await generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    await setSessionCookie(token);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    };
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError("User");

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async getUsers(params: { page: number; pageSize: number; search?: string; role?: string }) {
    const { users, total } = await userRepository.findMany({ ...params, sortOrder: "desc" });
    return {
      users: users.map(({ password: _, ...user }: any) => user),
      total,
    };
  },

  async getStats() {
    const [total, roleCounts] = await Promise.all([
      userRepository.count(),
      userRepository.countByRole(),
    ]);

    return {
      totalUsers: total,
      athletes: roleCounts["ATHLETE"] || 0,
      schools: roleCounts["SCHOOL_ADMIN"] || 0,
      coaches: roleCounts["COACH"] || 0,
      sponsors: roleCounts["SPONSOR"] || 0,
    };
  },
};
