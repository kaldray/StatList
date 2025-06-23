import { type AccessTokenResponse } from "@src/types/spotify";

export class SpotifyApi {
  #clientId: string;
  #clientSecret: string;
  #redirectUri: string =
    process.env.MODE === "development"
      ? "http://localhost:3000/api/auth/spotify/callback"
      : "http://www.statlist.fr/api/auth/callback/spotify";

  constructor(clientId: string, clientSecret: string) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
  }
  get_authorization(state: string): string {
    const url = new URL("https://accounts.spotify.com/authorize");
    console.log(this.#clientId);
    url.searchParams.append("client_id", this.#clientId);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("scope", "user-top-read,user-read-private");
    url.searchParams.append("redirect_uri", this.#redirectUri);
    url.searchParams.append("state", state);
    return url.toString();
  }

  async get_access_token(code: string) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(this.#clientId + ":" + this.#clientSecret).toString("base64")}`,
      },
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: this.#redirectUri,
      }),
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.log(error);
      throw new Error(error);
    }

    const data = await response.json();

    return data as AccessTokenResponse;
  }

  async refresh_access_token(refreshToken: string) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(this.#clientId + ":" + this.#clientSecret).toString("base64")}`,
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        clien_id: this.#clientId,
      }),
    });

    if (response.status !== 200) {
      const error = await response.json();
      console.log(error);
      throw new Error(error);
    }

    const data = await response.json();

    return data as AccessTokenResponse;
  }
}
