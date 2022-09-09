import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      accessTokenExpires?: number;
      refreshToken?: string;
      accessToken?: string;
      username?: string;
    };
    token: {
      accessToken?: string | null;
      refreshToken?: string | null;
      name?: string | null;
      email?: string | null;
      picture?: string | null;
      accesTokenExpires?: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessTokenExpires?: number;
    refreshToken?: string;
    accessToken?: string;
    username: string;
  }
}
