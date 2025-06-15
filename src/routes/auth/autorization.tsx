import { redirect } from "react-router";

import type { Route } from "./+types/autorization";
import { SpotifyApi } from "@src/lib/auth.server";
import { getSession, commitSession } from "@src/sessions.server";
import { assertIsString, generateState } from "@src/utils";
import { env } from "@src/lib/env_validator.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const state = generateState();
  if (params.provider === "spotify") {
    if (!env.success) {
      console.error("Spotify API is not configured");
      console.error(env.data);
    } else {
      const SPOTIFY_API = new SpotifyApi(env.data.SPOTIFY_CLIENT_ID, env.data.SPOTIFY_CLIENT_SECRET);
      session.set("state", state);
      assertIsString(state);
      return redirect(SPOTIFY_API.get_authorization(state), {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
  }
}
