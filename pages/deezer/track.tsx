import Head from "next/head";

import type { NextPage } from "next";

import { TrackWrapper } from "../../src/Components/Deezer/TrackWrapper";

const Track: NextPage = () => {
  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preload" href="/api/deezer/tracks" as="fetch" crossOrigin="anonymous" />
      </Head>
      <TrackWrapper />
    </>
  );
};

export default Track;
