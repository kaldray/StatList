import { ArtistItems, TrackItems, UserInfo, UserTopItems } from "@src/types/spotify";
import type { SpotifyQueryItems } from "./query";

const ME_ENDPOINT = "https://api.spotify.com/v1/me/";
const USER_TOP_TRACK = "https://api.spotify.com/v1/me/top/tracks";
const USER_TOP_ARTIST = "https://api.spotify.com/v1/me/top/artists";

export const getSpotifyMe = async (accesToken: string): Promise<UserInfo> => {
  const response = await fetch(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  });
  return await response.json();
};

export const getSpotifyTopTracks = async (
  accesToken: string,
  signal?: AbortSignal,
  searchParams?: SpotifyQueryItems,
): Promise<UserTopItems<TrackItems>> => {
  if (searchParams !== undefined) {
    const s = new URLSearchParams(searchParams);
    const response = await fetch(`${USER_TOP_TRACK}?${s.toString()}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
      signal: signal,
    });
    return response.json();
  }
  const response = await fetch(USER_TOP_TRACK, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
    signal: signal,
  });
  return response.json();
};

export const getSpotifyTopArtist = async (
  accesToken: string,
  signal: AbortSignal,
  searchParams?: SpotifyQueryItems,
): Promise<UserTopItems<ArtistItems>> => {
  if (searchParams !== undefined) {
    const s = new URLSearchParams(searchParams);
    const response = await fetch(`${USER_TOP_ARTIST}?${s.toString()}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
      signal: signal,
    });
    return response.json();
  }
  const response = await fetch(USER_TOP_ARTIST, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
    signal: signal,
  });
  return response.json();
};
