import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest): Promise<NextResponse | undefined> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token !== null && req.nextUrl.pathname.startsWith("/" + token.provider)) {
    return NextResponse.next();
  }
  if (token !== null && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${token.provider}`, req.url));
  }
}

export const config = {
  matcher: ["/deezer", "/deezer/artist", "/deezer/track", "/spotify", "/spotify/artist", "/spotify/track", "/"],
};
