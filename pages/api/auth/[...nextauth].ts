import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (token?.accessToken !== undefined && token?.refreshToken !== undefined) {
      spotifyApi.setAccessToken(token?.accessToken);
      spotifyApi.setRefreshToken(token?.refreshToken);
    }

    const { body: refreshTokens } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshTokens?.access_token,
      accessTokenExpires: Date.now() + refreshTokens?.expires_in * 1000,
      refreshToken: refreshTokens?.refresh_token ?? token.refreshToken,
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
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=user-top-read,user-read-private`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user != null && account != null && typeof account.expires_at === "number") {
        console.log(account.scope);
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          user,
        };
      }
      if (token.accessTokenExpires !== undefined && Date.now() < token?.accessTokenExpires) {
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
