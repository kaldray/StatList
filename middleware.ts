import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token !== null && req.nextUrl.pathname.startsWith("/" + token.provider)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/deezer", "/deezer/artist", "/deezer/track", "/spotify", "/spotify/artist", "/spotify/track"],
};
