import type { Route } from "./+types/artist";
import { ArtistWrapper } from "@components/Spotify/ArtistWrapper";
import { data, redirect, useSearchParams } from "react-router";
import { lazy, Suspense, startTransition } from "react";
import {
  commitSession,
  destroySession,
  get_current_session,
  get_session_user,
  is_statlist_user_connected,
} from "@src/sessions.server";
import { spotify_query_options, SpotifyQuerySchema } from "@src/providers/spotify/query";
import { dehydrate, HydrationBoundary, QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { assertIsDefined, assertIsString } from "@src/utils";
import { PeriodChoiceLoader } from "@components/PeriodChoiceLoader";
import { env } from "@src/lib/env_validator";

const PeriodChoice = lazy(async () => await import("@components/PeriodChoice"));

export async function loader({ request }: Route.LoaderArgs) {
  const session = await get_current_session(request);
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
  if (!env.success) {
    console.error("❌ Invalid environment variables. Check that you have all the variables");
    console.log(env.error);
    console.error(env.data);
    process.exit(1);
  } else if (env.success) {
    if (expired_at - now <= FIVE_MINUTES_IN_MS) {
      const SpotifyApi = (await import("@src/lib/auth")).SpotifyApi;
      const spotifyApi = new SpotifyApi(env.data.SPOTIFY_CLIENT_ID, env.data.SPOTIFY_CLIENT_SECRET);
      const response = await spotifyApi.refresh_access_token(user_session.refresh_token);
      session.set("statlist_user", {
        display_name: user_session.display_name,
        access_token: response.access_token,
        expires_in: new Date(Date.now() + response.expires_in * 1000),
        refresh_token: user_session.refresh_token ?? response.refresh_token,
        provider: "spotify",
      });
      const queryClient = new QueryClient();

      const searchParams = new URL(request.url).searchParams;
      const validated_search_params = SpotifyQuerySchema.parse(Object.fromEntries(searchParams));

      await queryClient.ensureQueryData(
        spotify_query_options.track(user_session.access_token, validated_search_params),
      );
      return data(
        { token: user_session.access_token, dehydratedState: dehydrate(queryClient) },
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

  const queryClient = new QueryClient();

  const searchParams = new URL(request.url).searchParams;
  const validated_search_params = SpotifyQuerySchema.parse(Object.fromEntries(searchParams));

  await queryClient.ensureQueryData(spotify_query_options.artist(user_session.access_token, validated_search_params));

  return data({ token: user_session.access_token, dehydratedState: dehydrate(queryClient) });
}

export default function ArtistRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <HydrationBoundary state={loaderData.dehydratedState}>
        <Suspense fallback={<PeriodChoiceLoader />}>
          <Artist token={loaderData.token} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

function Artist({ token }: { token: string }) {
  const [queryParams, setQueryParams] = useSearchParams();
  const validated_search_params = SpotifyQuerySchema.parse(Object.fromEntries(queryParams));

  const { data } = useSuspenseQuery({
    ...spotify_query_options.artist(token, validated_search_params),
  });

  function getShortTermArtist(): void {
    startTransition(() =>
      setQueryParams((oldParams) => ({
        time_range: "short_term",
        ...oldParams,
      })),
    );
  }

  function getLongTermArtist(): void {
    startTransition(() =>
      setQueryParams((oldParams) => ({
        time_range: "long_term",
        ...oldParams,
      })),
    );
  }

  function getMediummTermArtist(): void {
    startTransition(() =>
      setQueryParams((oldParams) => ({
        time_range: "medium_term",
        ...oldParams,
      })),
    );
  }

  return (
    <>
      <PeriodChoice
        getShortTermArtist={getShortTermArtist}
        getLongTermArtist={getLongTermArtist}
        getMediummTermArtist={getMediummTermArtist}
      />
      <ArtistWrapper tracks={data} />
    </>
  );
}
