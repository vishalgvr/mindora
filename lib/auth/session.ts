import { cookies } from "next/headers";
import { verifyToken, UserTokenPayload } from "./jwt";
import prisma from "@/lib/db/prisma";

export const AUTH_COOKIE_NAME = "mindora_session";

export async function getSessionUser(): Promise<UserTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSessionUser();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        occupation: true,
        responsePreferences: true,
        customInstructions: true,
        theme: true,
        language: true,
        defaultModel: true,
        enterToSend: true,
        showTimestamps: true,
        compactMode: true,
        createdAt: true,
      },
    });
    if (user) return user;
  } catch {
    // Database query failed, fallback to JWT claims
  }

  return {
    id: session.userId,
    name: session.name,
    email: session.email,
    role: session.role,
    avatar: null,
    occupation: null,
    responsePreferences: null,
    customInstructions: null,
    theme: "dark",
    language: "en",
    defaultModel: "mindora-balanced",
    enterToSend: true,
    showTimestamps: true,
    compactMode: false,
    createdAt: new Date(),
  };
}
