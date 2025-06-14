import { createCookieSessionStorage, Session } from "react-router";
import { AccessTokenResponse, UserInfo } from "./types/spotify";

type SessionData = {
  state: string;
  statlist_user: Partial<AccessTokenResponse> & { provider: "spotify" | "deezer" } & Partial<UserInfo>;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session",
    domain: import.meta.env.MODE === "development" ? "localhost" : "statlist.fr",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    secrets: ["s3cret"],
    sameSite: "lax",
    secure: import.meta.env.MODE === "production",
  },
});

export async function is_statlist_user_connected(request: Request): Promise<boolean> {
  const session = await getSession(request.headers.get("Cookie"));
  const is_connected = session.has("statlist_user");
  return is_connected;
}

export async function get_session_user(
  request: Request,
): Promise<Partial<AccessTokenResponse & UserInfo & { provider: "spotify" | "deezer" }>> {
  const session = await get_current_session(request);
  const user = session.get("statlist_user") as Partial<AccessTokenResponse>;
  return user;
}

export async function get_current_session(request: Request): Promise<Session<SessionData, SessionData>> {
  const session = await getSession(request.headers.get("Cookie"));
  return session;
}

export { getSession, commitSession, destroySession };
