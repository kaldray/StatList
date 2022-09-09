import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getSpotifyTopTracks } from "../../functions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({
    req,
  });
  if (session && session.user.accessToken) {
    const response = await getSpotifyTopTracks(session?.user?.accessToken);
    return res.send(response);
  }
};

export default handler;
