import { redirect } from "react-router";
import type { Route } from "./+types/spotify_callback";
import { assertIsString, verifyState } from "@src/utils";
import { getSession, destroySession, commitSession } from "@src/sessions.server";
import { getSpotifyMe } from "@src/providers/spotify/endpoint";
import { envSchema } from "@src/lib/env_validator.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionState = session.get("state");
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  if (error) {
    redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
  }
  if (!state || !code) {
    redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
  }
  assertIsString(state);
  assertIsString(code);
  assertIsString(sessionState);
  const isStateValid = verifyState(state, sessionState);
  if (!isStateValid) {
    redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
  }

  const SpotifyApi = (await import("@src/lib/auth.server")).SpotifyApi;
  const env = envSchema.parse(process.env);
  const spotifyApi = new SpotifyApi(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_CLIENT_SECRET);
  const auth_data = await spotifyApi.get_access_token(code);
  session.unset("state");
  const user_info = await getSpotifyMe(auth_data.access_token);
  session.set("statlist_user", {
    access_token: auth_data.access_token,
    refresh_token: auth_data.refresh_token,
    expires_in: new Date(Date.now() + auth_data.expires_in * 1000),
    provider: "spotify",
    display_name: user_info.display_name,
  });

  return redirect("/spotify", {
    headers: {
      "Set-Cookie": await commitSession(session, {
        maxAge: auth_data.expires_in,
        expires: new Date(Date.now() + auth_data.expires_in * 1000),
      }),
    },
  });
}
