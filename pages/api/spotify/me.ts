import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getSpotifyMe } from "@providers/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (session?.user.accessToken !== undefined) {
    const response = await getSpotifyMe(session.user.accessToken);
    return res.send(response);
  } else {
    return res.send("Vous n'êtes pas autorisé.");
  }
};

export default handler;
