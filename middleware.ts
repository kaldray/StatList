import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest): Promise<NextResponse | undefined> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const allowIfNonToken = ["/term", "/", "/login"];

  if (token === null && !allowIfNonToken.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (token === null && allowIfNonToken.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!config.matcher.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (token !== null && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${token.provider}`, req.url));
  }
  if (token !== null && req.nextUrl.pathname.startsWith("/" + token.provider)) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/deezer",
    "/deezer/artist",
    "/deezer/track",
    "/spotify",
    "/spotify/artist",
    "/spotify/track",
    "/",
    "/login",
    "/term",
  ],
};
