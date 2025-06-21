import { type AccessTokenResponse } from "@src/types/spotify";

import { type AccessDeezerTokenResponse } from "@src/types/deezer";

export class SpotifyApi {
  #clientId: string;
  #clientSecret: string;
  #redirectUri: string = "http://localhost:3000/api/auth/callback/spotify";

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

export class DeezerApi {
  #appId: string;
  #appSecret: string;
  #redirectUri: string = "http://localhost:3000/api/auth/callback/deezer";

  constructor(appId: string, appSecret: string) {
    this.#appId = appId;
    this.#appSecret = appSecret;
  }

  get_authorization(state: string, perms: string = "basic_access,email"): string {
    const url = new URL("https://connect.deezer.com/oauth/auth.php");
    console.log(this.#appId);
    url.searchParams.append("app_id", this.#appId);
    url.searchParams.append("redirect_uri", this.#redirectUri);
    url.searchParams.append("perms", perms);
    url.searchParams.append("state", state);
    return url.toString();
  }

  async get_access_token(code: string) {
    const url = new URL("https://connect.deezer.com/oauth/access_token.php");
    url.searchParams.append("app_id", this.#appId);
    url.searchParams.append("secret", this.#appSecret);
    url.searchParams.append("code", code);
    url.searchParams.append("output", "json");

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      throw new Error(`Deezer API Error: ${error}`);
    }

    const data = await response.json();

    // Vérifier si la réponse contient une erreur
    if (data.error) {
      throw new Error(`Deezer OAuth Error: ${data.error.message || data.error}`);
    }

    return data as AccessDeezerTokenResponse;
  }

  // Méthode utilitaire pour vérifier la validité d'un token
  async verify_token(accessToken: string) {
    const response = await fetch(`https://api.deezer.com/user/me?access_token=${accessToken}`, {
      method: "GET",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !data.error;
  }
}
