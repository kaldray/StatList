import NextAuth, { TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyWebApi from "spotify-web-api-node";
import { User } from "types/deezer";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function spotifyRefreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (token.accessToken !== undefined && token.refreshToken !== undefined) {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);
    }

    const { body: refreshTokens } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshTokens.access_token,
      accessTokenExpires: Date.now() + refreshTokens.expires_in * 1000,
      refreshToken: refreshTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function getDeezerToken(paramsUrl: URLSearchParams): Promise<TokenSet> {
  const res = await fetch(`https://connect.deezer.com/oauth/access_token.php?${paramsUrl.toString()}`);
  const data = new URLSearchParams(await res.text());
  const accessToken = data.get("access_token");
  const expires = data.get("expires");
  if (expires === null) {
    throw new Error("Missing Expires Time");
  }
  const expiresTime = Date.now() + parseInt(expires);
  if (accessToken === null) {
    throw new Error("Missing Acces Token");
  }
  return {
    access_token: accessToken,
    expires_at: expiresTime,
  };
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=user-top-read,user-read-private`,
    }),
    {
      id: "deezer",
      name: "Deezer",
      type: "oauth",
      clientId: process.env.DEEZER_CLIENT_ID,
      clientSecret: process.env.DEEZER_CLIENT_SECRET,
      token: {
        async request({ provider, params }) {
          if (provider.clientId === undefined || provider.clientSecret === undefined || params.code === undefined) {
            throw new Error("Provider is not defined");
          }
          const paramsUrl = new URLSearchParams({
            app_id: provider.clientId,
            secret: provider.clientSecret,
            code: params.code,
          });
          const tokens = await getDeezerToken(paramsUrl);
          return { tokens };
        },
      },
      authorization: {
        url: "https://connect.deezer.com/oauth/auth.php",
        params: {
          redirect_uri: "https://www.statlist.fr/api/auth/callback/deezer",
          scope: "basic_access,email,listening_history,offline_access",
        },
      },
      userinfo: {
        url: "https://api.deezer.com/user/me",
        async request({ tokens, client }) {
          const { access_token } = tokens;
          if (typeof access_token === "undefined") {
            throw new Error("Users Acces Token is Undefined!");
          }
          return await client.userinfo(access_token, { params: { access_token } });
        },
      },
      async profile(user: User) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.picture,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account != null && account.provider === "spotify" && user != null && typeof account.expires_at === "number") {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          provider: account.provider,
          user,
        };
      }
      if (account != null && account.provider === "deezer" && typeof account.expires_at === "number") {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          provider: account.provider,
          user,
        };
      }
      if (
        token.provider === "spotify" &&
        token.accessTokenExpires !== undefined &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }
      if (token.provider === "spotify") {
        return await spotifyRefreshAccessToken(token);
      }
      return { ...token };
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      session.user.provider = token.provider;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
});
