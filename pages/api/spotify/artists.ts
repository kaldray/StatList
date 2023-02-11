import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { getSpotifyTopArtist } from "@providers/spotify";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response | undefined> => {
  const token = await getToken({ req });
  const { searchParams } = new URL(req.url);
  const time_range = searchParams.get("time_range");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  if (token?.accessToken !== undefined) {
    if (typeof limit === "string" && typeof offset === "string" && typeof time_range === "string") {
      const params = new URLSearchParams({
        limit,
        offset,
        time_range,
      });
      const response = await getSpotifyTopArtist(token.accessToken, params);
      return new Response(JSON.stringify(response), { status: 200 });
    }
    if (typeof limit === "string" && typeof offset === "string") {
      const params = new URLSearchParams({ limit, offset });
      const response = await getSpotifyTopArtist(token.accessToken, params);
      return new Response(JSON.stringify(response), { status: 200 });
    }
    if (typeof time_range === "string") {
      const params = new URLSearchParams({ time_range });
      const response = await getSpotifyTopArtist(token.accessToken, params);

      return new Response(JSON.stringify(response), { status: 200 });
    }
    const response = await getSpotifyTopArtist(token.accessToken);
    return new Response(JSON.stringify(response), { status: 200 });
  }
};

export default handler;
