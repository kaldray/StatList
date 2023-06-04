import { cookies } from "next/headers";

import { Pagination } from "@components/Spotify/Pagination";
import { Artist } from "@components/Spotify/Artist";
import { getSpotifyTopArtist } from "@providers/spotify";

import { SpotifyPageProps } from "types/next";
import { Suspense } from "react";

const getArtistData = async (params: URLSearchParams | undefined) => {
  const jwt = cookies().get("jwt");
  if (jwt === undefined) {
    throw new Error("Missing JWT token");
  }
  const response = await getSpotifyTopArtist(jwt.value, params);
  return response;
};

export default async function Page({ searchParams }: SpotifyPageProps) {
  const params = new URLSearchParams(searchParams);
  const data = await getArtistData(params);
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Artist {...data} />
      <Suspense fallback={<p>loading...</p>}>
        <Pagination items={data.items} previous={data.previous} next={data.next} />
      </Suspense>
    </>
  );
}
