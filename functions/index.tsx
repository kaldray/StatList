const ME_ENDPOINT = "https://api.spotify.com/v1/me/";

export const getSpotifyMe = async (accesToken: string) => {
  return fetch(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  }).then((response) => {
    return response.json();
  });
};
