import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getSpotifyMe } from "@providers/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session !== undefined && session !== null && session.user.accessToken) {
    const response = await getSpotifyMe(session?.user?.accessToken);
    return res.send(response);
  } else {
    return res.send("Vous n'êtes pas autorisé.");
  }
};

export default handler;
