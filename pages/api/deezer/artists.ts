import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getDeezerTopArtists } from "@providers/deezer";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (session === null || session.user.username === undefined) {
    throw new Error("Session is undefined");
  }
  const response = await getDeezerTopArtists(session?.user.username);
  return res.status(200).send(response);
};

export default handler;
