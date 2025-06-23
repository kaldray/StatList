import { redirect } from "react-router";

import type { Route } from "./+types/autorization";
import { getSession, commitSession } from "@src/sessions.server";
import { assertIsString, generateState } from "@src/utils";
import { validateEnv } from "@src/lib/env_validator.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const state = generateState();
  if (params.provider === "spotify") {
    const env = validateEnv();
    const SpotifyApi = (await import("@src/lib/auth.server")).SpotifyApi;
    const spotifyApi = new SpotifyApi(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_CLIENT_SECRET);
    session.set("state", state);
    assertIsString(state);
    return redirect(spotifyApi.get_authorization(state), {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
}
