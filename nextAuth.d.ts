import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      accessTokenExpires?: number;
      refreshToken?: string;
      accessToken?: string;
      username?: string;
      provider: "spotify" | "deezer";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessTokenExpires?: number;
    refreshToken?: string;
    accessToken?: string;
    username: string;
    provider: "spotify" | "deezer";
  }
}
