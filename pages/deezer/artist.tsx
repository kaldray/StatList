import Head from "next/head";

import type { NextPage } from "next";

import { Layout } from "@components/index";
import { ArtistWrapper } from "@components/Deezer/ArtistWrapper";

const Track: NextPage = () => {
  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preload" href="/api/deezer/artists" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Layout>
        <ArtistWrapper />
      </Layout>
    </>
  );
};

export default Track;
