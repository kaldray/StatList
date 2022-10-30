import { ArtistItems, QueryItems, TrackItems, UserInfo, UserTopItems } from "types/spotify";

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
  query?: QueryItems,
  limit?: string,
  offset?: string
): Promise<UserTopItems<TrackItems>> => {
  if (
    limit !== undefined &&
    typeof limit === "string" &&
    offset !== undefined &&
    query !== undefined &&
    typeof offset === "string"
  ) {
    const response = await fetch(`${USER_TOP_TRACK}?limit=${limit}&offset=${offset}&time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return await response.json();
  }

  if (limit !== undefined && typeof limit === "string" && offset !== undefined && typeof offset === "string") {
    const response = await fetch(`${USER_TOP_TRACK}?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return await response.json();
  }
  if (query !== undefined) {
    const response = await fetch(`${USER_TOP_TRACK}?time_range=${query}`, {
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
  query?: QueryItems,
  limit?: string,
  offset?: string
): Promise<UserTopItems<ArtistItems>> => {
  if (
    limit !== undefined &&
    typeof limit === "string" &&
    offset !== undefined &&
    query !== undefined &&
    typeof offset === "string"
  ) {
    const response = await fetch(`${USER_TOP_ARTIST}?limit=${limit}&offset=${offset}&time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return await response.json();
  }

  if (limit !== undefined && typeof limit === "string" && offset !== undefined && typeof offset === "string") {
    const response = await fetch(`${USER_TOP_ARTIST}?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return await response.json();
  }
  if (query !== undefined) {
    const response = await fetch(`${USER_TOP_ARTIST}?time_range=${query}`, {
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
