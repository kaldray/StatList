import type { UserTopArtist, UserTopTracks } from "@src/types/deezer";

export const getDeezerTopTracks = async (userId: string, params?: URLSearchParams): Promise<UserTopTracks> => {
  if (params !== undefined) {
    const res = await fetch(`https://api.deezer.com/user/${userId}/charts/tracks?${params.toString()}`);
    return await res.json();
  }
  const res = await fetch(`https://api.deezer.com/user/${userId}/charts/tracks?index=0&limit=20`);
  return await res.json();
};

export const getDeezerTopArtists = async (userId: string): Promise<UserTopArtist> => {
  const res = await fetch(`https://api.deezer.com/user/${userId}/charts/artists`);
  return await res.json();
};
