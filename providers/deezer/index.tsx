import { UserTopTracks } from "types/deezer";
const USER_TOP_ARTIST = "https://api.spotify.com/v1/me/top/artists";

export const getDeezerTopTracks = async (userId: string, accessToken?: string): Promise<UserTopTracks> => {
  const res = await fetch(`https://api.deezer.com/user/${userId}/charts/tracks?index=0&limit=20`);
  return await res.json();
};
