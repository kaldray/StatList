import { cookies } from "next/headers";

import { Pagination } from "@components/Ui/Pagination";
import { Track } from "@components/Spotify/Track";
import { getSpotifyTopTracks } from "@providers/spotify";

import { SpotifyPageProps } from "types/next";

const getArtistData = async (params: URLSearchParams | undefined) => {
  const jwt = cookies().get("jwt");
  if (jwt === undefined) {
    throw new Error("Missing JWT token");
  }
  const response = await getSpotifyTopTracks(jwt.value, params);
  return response;
};

export default async function Page({ searchParams }: SpotifyPageProps) {
  const params = new URLSearchParams(searchParams);
  const data = await getArtistData(params);
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Track {...data} />
      <Pagination items={data.items} previous={data.previous} next={data.next} />
    </>
  );
}