import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getSpotifyTopArtist } from "../../functions";
import { QueryItems } from "types";

type M = keyof QueryItems;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({
    req,
  });

  if (
    session &&
    session.user.accessToken &&
    req.query?.limit &&
    req.query?.offset &&
    (req?.query.range === "long_term" || req?.query.range === "short_term")
  ) {
    const response = await getSpotifyTopArtist(
      session?.user?.accessToken,
      req.query?.range,
      req.query?.limit,
      req.query?.offset
    );
    return res.status(200).send(response);
  }

  if (session && session.user.accessToken && (req.query?.range === "short_term" || req.query?.range === "long_term")) {
    const response = await getSpotifyTopArtist(session?.user?.accessToken, req.query?.range);
    return res.status(200).send(response);
  }

  if (session && session.user.accessToken && req.query?.limit && req.query?.offset) {
    const response = await getSpotifyTopArtist(
      session?.user?.accessToken,
      undefined,
      req.query?.limit,
      req.query?.offset
    );
    return res.status(200).send(response);
  }

  if (session && session.user.accessToken) {
    const response = await getSpotifyTopArtist(session?.user?.accessToken);
    return res.status(200).send(response);
  }
};

export default handler;
