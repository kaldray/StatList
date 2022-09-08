import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token: JWT) {
  try {
    let refreshedTokens;
    if (token.refreshToken) {
      let url = "https://accounts.spotify.com/api/token";
      const client_id = process.env.SPOTIFY_CLIENT_ID;
      const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
      const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
        "base64"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        }),
      });
      refreshedTokens = await response.json();

      if (!response.ok) {
        throw new Error(refreshedTokens);
      }
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-recently-played,user-top-read",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user && account && typeof account.expires_at === "number") {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          user,
        };
      }
      if (
        token !== undefined &&
        token.accessTokenExpires &&
        Date.now() < token?.accessTokenExpires
      ) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
