import type { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { getDeezerTopArtists } from "@providers/deezer";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response | undefined> => {
  const token = await getToken({ req });
  if (token === null) {
    throw new Error("Missing token");
  }

  const response = await getDeezerTopArtists(token.username);
  return new Response(JSON.stringify(response), { status: 200 });
};

export default handler;
