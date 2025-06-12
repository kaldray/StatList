import { redirect } from "react-router";

import type { Route } from "./+types/autorization";
import { SpotifyApi } from "@src/lib/auth";
import { getSession, commitSession } from "@src/sessions.server";
import { assertIsString, generateState } from "@src/utils";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const state = generateState();
  if (params.provider === "spotify") {
    const SPOTIFY_API = new SpotifyApi(
      import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    );
    session.set("state", state);
    assertIsString(state);
    return redirect(SPOTIFY_API.get_authorization(state), { headers: { "Set-Cookie": await commitSession(session) } });
  }
}
