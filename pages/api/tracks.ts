import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { getSpotifyTopTracks } from "@providers/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({
    req,
  });
  if (
    session &&
    session.user.accessToken &&
    req.query?.limit &&
    req.query?.offset &&
    (req.query?.time_range === "short_term" ||
      req.query?.time_range === "long_term" ||
      req.query?.time_range === "medium_term")
  ) {
    const response = await getSpotifyTopTracks(
      session?.user?.accessToken,
      req.query?.time_range,
      req.query?.limit,
      req.query?.offset
    );
    return res.status(200).send(response);
  }

  if (
    session &&
    session.user.accessToken &&
    (req.query?.time_range === "medium_term" ||
      req.query?.time_range === "short_term" ||
      req.query?.time_range === "long_term")
  ) {
    const response = await getSpotifyTopTracks(session?.user?.accessToken, req.query?.time_range);
    return res.status(200).send(response);
  }

  if (session && session.user.accessToken && req.query?.limit && req.query?.offset) {
    const response = await getSpotifyTopTracks(
      session?.user?.accessToken,
      undefined,
      req.query?.limit,
      req.query?.offset
    );
    return res.status(200).send(response);
  }

  if (session && session.user.accessToken) {
    const response = await getSpotifyTopTracks(session?.user?.accessToken);
    return res.status(200).send(response);
  }
};

export default handler;
