import {
  commitSession,
  destroySession,
  get_session_user,
  getSession,
  is_statlist_user_connected,
} from "@src/sessions.server";
import type { Route } from "./+types/index";
import styles from "@styles/Pages/home.module.scss";
import { data, redirect } from "react-router";
import { assertIsDefined, assertIsString } from "@src/utils";
import { env } from "@src/lib/env_validator.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const session_has_user = await is_statlist_user_connected(request);
  if (!session_has_user) {
    throw redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
  }
  const user_session = await get_session_user(request);
  assertIsString(user_session.access_token);
  assertIsDefined(user_session.expires_in);
  assertIsDefined(user_session.refresh_token);

  const expired_at = new Date(user_session.expires_in).getTime();
  const now = new Date().getTime();
  const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

  if (expired_at - now <= FIVE_MINUTES_IN_MS) {
    const SpotifyApi = (await import("@src/lib/auth.server")).SpotifyApi;
    if (!env.success) {
      console.error("Spotify API key is not defined");
      console.log(env.data);
    } else {
      const spotifyApi = new SpotifyApi(env.data.SPOTIFY_CLIENT_ID, env.data.SPOTIFY_CLIENT_SECRET);
      const response = await spotifyApi.refresh_access_token(user_session.refresh_token);
      session.set("statlist_user", {
        display_name: user_session.display_name,
        access_token: response.access_token,
        expires_in: new Date(Date.now() + response.expires_in * 1000),
        refresh_token: user_session.refresh_token ?? response.refresh_token,
        provider: "spotify",
      });

      return data(
        { name: user_session.display_name, provider: user_session.provider },
        {
          headers: {
            "Set-Cookie": await commitSession(session, {
              expires: new Date(Date.now() + response.expires_in * 1000),
              maxAge: response.expires_in,
            }),
          },
        },
      );
    }
  }

  return data({ name: user_session.display_name, provider: user_session.provider });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { presentation__container } = styles;
  const { name, provider } = loaderData;

  return (
    <>
      <section className={presentation__container}>
        <h1>Bienvenue sur StatList {name} </h1>
        <p>
          Vous êtes connectez avec votre compte {provider} <strong></strong>
        </p>
        <p>
          Grâce à notre outil, vous pouvez découvrir <strong> vos artistes les plus écoutés</strong> et{" "}
          <strong>vos titres les plus populaires</strong>, en temps réel.
        </p>
        <p>
          Pour accéder à vos statistiques, rendez-vous sur les pages de <span>meilleur artiste</span> ou{" "}
          <span>de meilleure</span> chanson.
        </p>
      </section>
    </>
  );
}
