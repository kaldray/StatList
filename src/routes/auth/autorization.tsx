import { redirect } from "react-router";

import type { Route } from "./+types/autorization";
import { getSession, commitSession } from "@src/sessions.server";
import { assertIsString, generateState } from "@src/utils";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const state = generateState();
  if (params.provider === "spotify") {
    const SpotifyApi = (await import("@src/lib/auth.server")).SpotifyApi;
    const spotifyApi = new SpotifyApi(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET);
    session.set("state", state);
    assertIsString(state);
    return redirect(spotifyApi.get_authorization(state), {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
}
