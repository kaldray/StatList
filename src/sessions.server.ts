import type { Session } from "react-router";
import { createCookieSessionStorage } from "react-router";
import type { AccessTokenResponse, UserInfo } from "./types/spotify";

type StatlistUser = Omit<AccessTokenResponse, "expires_in" | "scope" | "token_type">;

type SessionData = {
  state: string;
  statlist_user: StatlistUser &
    Partial<UserInfo> & {
      provider: "spotify" | "deezer";
      expires_in: Date;
    };
};
const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session",
    domain: import.meta.env.MODE === "development" ? "localhost" : "statlist.fr",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    secrets: [process.env.NEXTAUTH_SECRET],
    sameSite: "lax",
    secure: import.meta.env.MODE === "production",
  },
});

export async function is_statlist_user_connected(request: Request): Promise<boolean> {
  const session = await getSession(request.headers.get("Cookie"));
  const is_connected = session.has("statlist_user");
  return is_connected;
}

export async function get_session_user(request: Request): Promise<Partial<SessionData["statlist_user"]>> {
  const session = await get_current_session(request);
  const user = session.get("statlist_user") as Partial<SessionData["statlist_user"]>;
  return user;
}

export async function get_current_session(request: Request): Promise<Session<SessionData, SessionData>> {
  const session = await getSession(request.headers.get("Cookie"));
  return session;
}

export { getSession, commitSession, destroySession };
