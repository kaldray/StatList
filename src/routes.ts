import { type RouteConfig, route, layout, prefix, index } from "@react-router/dev/routes";

export default [
  layout("./components/Layout.tsx", [
    index("routes/index.tsx"),
    route("/term", "routes/term.tsx"),
    route("logout", "routes/logout.ts"),
    route("login", "routes/login.tsx"),
    ...prefix("spotify", [
      index("routes/spotify/index.tsx"),
      route("/artist", "routes/spotify/artist.tsx"),
      route("/track", "routes/spotify/track.tsx"),
    ]),
  ]),
  route("/api/auth/callback/spotify", "routes/auth/spotify_callback.tsx"),
  route("/api/auth/autorization/:provider", "routes/auth/autorization.tsx"),
  route("*", "catchall.tsx"),
] satisfies RouteConfig;
