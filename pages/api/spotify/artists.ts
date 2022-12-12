import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getSpotifyTopArtist } from "@providers/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({
    req,
  });

  if (
    session?.user.accessToken !== undefined &&
    req.query.limit !== undefined &&
    typeof req.query.limit === "string" &&
    req.query.offset !== undefined &&
    typeof req.query.offset === "string" &&
    (req.query?.time_range === "short_term" ||
      req.query?.time_range === "long_term" ||
      req.query?.time_range === "medium_term")
  ) {
    const response = await getSpotifyTopArtist(
      session?.user?.accessToken,
      req.query?.time_range,
      req.query?.limit,
      req.query?.offset
    );
    return res.status(200).send(response);
  }

  if (
    session?.user.accessToken !== undefined &&
    (req.query?.time_range === "short_term" ||
      req.query?.time_range === "long_term" ||
      req.query?.time_range === "medium_term")
  ) {
    const response = await getSpotifyTopArtist(session?.user?.accessToken, req.query?.time_range);
    return res.status(200).send(response);
  }

  if (
    session?.user.accessToken !== undefined &&
    req.query.limit !== undefined &&
    typeof req.query.limit === "string" &&
    req.query.offset !== undefined &&
    typeof req.query.offset === "string"
  ) {
    const response = await getSpotifyTopArtist(
      session?.user?.accessToken,
      undefined,
      req.query?.limit,
      req.query?.offset
    );
    return res.status(200).send(response);
  }

  if (session?.user.accessToken !== undefined) {
    const response = await getSpotifyTopArtist(session?.user?.accessToken);
    return res.status(200).send(response);
  }
};

export default handler;
