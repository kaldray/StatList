import { ArtistItems, TrackItems, UserInfo, UserTopItems } from "types/spotify";

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
  searchParams?: URLSearchParams
): Promise<UserTopItems<TrackItems>> => {
  if (searchParams !== undefined) {
    const response = await fetch(`${USER_TOP_TRACK}?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return await response.json();
  }
  const response = await fetch(USER_TOP_TRACK, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  });
  return await response.json();
};

export const getSpotifyTopArtist = async (
  accesToken: string,
  searchParams?: URLSearchParams
): Promise<UserTopItems<ArtistItems>> => {
  if (searchParams !== undefined) {
    const response = await fetch(`${USER_TOP_ARTIST}?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return await response.json();
  }
  const response = await fetch(USER_TOP_ARTIST, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  });
  return await response.json();
};
