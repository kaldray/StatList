import type { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { getDeezerTopTracks } from "@providers/deezer";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response | Error> => {
  const token = await getToken({ req });
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");
  const index = searchParams.get("index");
  if (token === null) {
    throw new Error("Missing token");
  }

  if (typeof limit === "string" && typeof index === "string") {
    const params = new URLSearchParams({ limit, index });
    const response = await getDeezerTopTracks(token.username, params);
    return new Response(JSON.stringify(response), { status: 200 });
  }

  const response = await getDeezerTopTracks(token.username);
  return new Response(JSON.stringify(response), { status: 200 });
};

export default handler;
