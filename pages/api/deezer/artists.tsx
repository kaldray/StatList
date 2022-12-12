import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getDeezerTopArtists } from "@providers/deezer";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (session === null || session.user.username === undefined) {
    throw new Error("Session is undefined");
  }
  if (
    Boolean(req.query.limit) &&
    Boolean(req.query.index) &&
    typeof req.query.limit === "string" &&
    typeof req.query.index === "string"
  ) {
    const params = new URLSearchParams({ limit: req.query.limit, index: req.query.index });
    const response = await getDeezerTopArtists(session?.user.username, params);
    return res.status(200).send(response);
  }
  const response = await getDeezerTopArtists(session?.user.username);
  return res.status(200).send(response);
};

export default handler;
