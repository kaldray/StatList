import type { Route } from "./+types/track";

import { TrackWrapper } from "@components/Spotify/TrackWrapper";
import { redirect, useSearchParams } from "react-router";
import { lazy, Suspense, startTransition } from "react";
import {
  destroySession,
  get_current_session,
  get_session_user,
  is_statlist_user_connected,
} from "@src/sessions.server";

import { spotify_query_options, SpotifyQuerySchema } from "@src/providers/spotify/query";
import { dehydrate, HydrationBoundary, QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { assertIsString } from "@src/utils";

const PeriodChoice = lazy(async () => await import("@components/PeriodChoice"));

export async function loader({ request }: Route.LoaderArgs) {
  const session = await get_current_session(request);
  const session_has_user = await is_statlist_user_connected(request);

  if (!session_has_user) {
    throw redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
  }

  const user_session = await get_session_user(request);
  const queryClient = new QueryClient();
  assertIsString(user_session.access_token);

  const searchParams = new URL(request.url).searchParams;
  const validated_search_params = SpotifyQuerySchema.parse(Object.fromEntries(searchParams));

  await queryClient.ensureQueryData(spotify_query_options.track(user_session.access_token, validated_search_params));
  return { token: user_session.access_token, dehydratedState: dehydrate(queryClient) };
}

function Track({ token }: { token: string }) {
  const [queryParams, setQueryParams] = useSearchParams();
  const validated_search_params = SpotifyQuerySchema.parse(Object.fromEntries(queryParams));
  const { data } = useSuspenseQuery({
    ...spotify_query_options.track(token, validated_search_params),
  });

  function getShortTermArtist(): void {
    startTransition(() => setQueryParams({ time_range: "short_term" }));
  }

  function getLongTermArtist(): void {
    startTransition(() => setQueryParams({ time_range: "long_term" }));
  }

  function getMediummTermArtist(): void {
    startTransition(() => setQueryParams({ time_range: "medium_term" }));
  }
  return (
    <>
      <PeriodChoice
        getShortTermArtist={getShortTermArtist}
        getLongTermArtist={getLongTermArtist}
        getMediummTermArtist={getMediummTermArtist}
      />
      <TrackWrapper tracks={data} />
    </>
  );
}

export default function TrackRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <HydrationBoundary state={loaderData.dehydratedState}>
        <Suspense fallback={<div>Loading...</div>}>
          <Track token={loaderData.token} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
