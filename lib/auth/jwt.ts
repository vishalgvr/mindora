import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_SECRET || "mindora_fallback_secret_key_84920491";

export interface UserTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: UserTokenPayload, expiresIn: string = "7d"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): UserTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
