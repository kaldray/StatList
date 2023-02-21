import { UserInfo, UserTopTracksItems, UserTopArtistsItems, userTopArtistsItemsSchema } from "types/spotify";

const ME_ENDPOINT = "https://api.spotify.com/v1/me/";
const USER_TOP_TRACK = "https://api.spotify.com/v1/me/top/tracks";
const USER_TOP_ARTIST = "https://api.spotify.com/v1/me/top/artists";

export class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

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
): Promise<UserTopTracksItems> => {
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
): Promise<UserTopArtistsItems> => {
  if (searchParams !== undefined) {
    return await fetch(`${USER_TOP_ARTIST}?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((res) => {
            throw new ResponseError("Response is not ok", res);
          });
        }
        return response.json();
      })
      .then((res) => {
        const result = userTopArtistsItemsSchema.safeParse(res);
        if (!result.success) {
          throw new Error("Response is not ok", result.error);
        }
        return result.data;
      });
  }
  return await fetch(USER_TOP_ARTIST, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((res) => {
          throw new ResponseError("Response is not ok", res);
        });
      }
      return response.json();
    })
    .then((res) => {
      const result = userTopArtistsItemsSchema.safeParse(res);
      if (!result.success) {
        throw new Error("Response is not ok", result.error);
      }
      return result.data;
    });
};
