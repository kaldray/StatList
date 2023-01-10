import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getSpotifyTopArtist } from "@providers/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({
    req,
  });

  if (session?.user.accessToken !== undefined) {
    if (
      Boolean(req.query.limit) &&
      Boolean(req.query.offset) &&
      Boolean(req.query.time_range) &&
      typeof req.query.limit === "string" &&
      typeof req.query.offset === "string" &&
      typeof req.query.time_range === "string"
    ) {
      const params = new URLSearchParams({
        limit: req.query.limit,
        offset: req.query.offset,
        time_range: req.query.time_range,
      });
      const response = await getSpotifyTopArtist(session.user.accessToken, params);
      return res.status(200).send(response);
    }
    if (
      Boolean(req.query.limit) &&
      Boolean(req.query.offset) &&
      typeof req.query.limit === "string" &&
      typeof req.query.offset === "string"
    ) {
      const params = new URLSearchParams({ limit: req.query.limit, offset: req.query.offset });
      const response = await getSpotifyTopArtist(session.user.accessToken, params);
      return res.status(200).send(response);
    }
    if (Boolean(req.query.time_range) && typeof req.query.time_range === "string") {
      const params = new URLSearchParams({ time_range: req.query.time_range });
      const response = await getSpotifyTopArtist(session.user.accessToken, params);
      return res.status(200).send(response);
    }
    const response = await getSpotifyTopArtist(session.user.accessToken);
    return res.status(200).send(response);
  }
};

export default handler;
