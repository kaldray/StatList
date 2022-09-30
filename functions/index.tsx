import { ArtistItems, QueryItems, TrackItems, UserInfo, UserTopItems } from "types";

const ME_ENDPOINT = "https://api.spotify.com/v1/me/";
const USER_TOP_TRACK = "https://api.spotify.com/v1/me/top/tracks";
const USER_TOP_ARTIST = "https://api.spotify.com/v1/me/top/artists";

export const getSpotifyMe = async (accesToken: string): Promise<UserInfo> => {
  return fetch(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  }).then((response) => {
    return response.json();
  });
};
export const getSpotifyTopTracks = async (
  accesToken: string,
  query?: QueryItems
): Promise<UserTopItems<TrackItems>> => {
  if (query) {
    return fetch(`${USER_TOP_TRACK}?time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    }).then((response) => {
      return response.json();
    });
  }
  return fetch(USER_TOP_TRACK, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  }).then((response) => {
    return response.json();
  });
};
export const getSpotifyTopArtist = async (
  accesToken: string,
  query?: QueryItems
): Promise<UserTopItems<ArtistItems>> => {
  if (query) {
    return fetch(`${USER_TOP_ARTIST}?time_range=${query}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    }).then((response) => {
      return response.json();
    });
  }
  return fetch(`${USER_TOP_ARTIST}`, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  }).then((response) => {
    return response.json();
  });
};
