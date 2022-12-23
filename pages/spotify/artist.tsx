import { useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { QueryItems } from "types/spotify";

import { Layout } from "@components/index";
import { ArtistWrapper } from "@components/Spotify/ArtistWrapper";

const PeriodChoice = dynamic(async () => await import("@components/PeriodChoice").then((res) => res.PeriodChoice));

const Artist: NextPage = () => {
  const [queryParams, setQueryParams] = useState<QueryItems>(undefined);

  function getShortTermArtist(): void {
    setQueryParams("short_term");
  }

  function getLongTermArtist(): void {
    setQueryParams("long_term");
  }

  function getMediummTermArtist(): void {
    setQueryParams("medium_term");
  }

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preload" href="/api/artists" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Layout>
        <PeriodChoice
          getShortTermArtist={getShortTermArtist}
          getLongTermArtist={getLongTermArtist}
          getMediummTermArtist={getMediummTermArtist}
        />
        <ArtistWrapper queryParams={queryParams} />
      </Layout>
    </>
  );
};

export default Artist;
