import { useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Error from "next/error";

import type { NextPage } from "next";
import { ArtistItems, UserTopItems } from "types";

import { Layout, ArtistCard, PeriodChoice, Loader } from "@components/index";
import styles from "@styles/Pages/artist.module.scss";

const Artist: NextPage = () => {
  const { artist__container } = styles;
  const [queryParams, setQueryParams] = useState<string | undefined>(undefined);
  const fetcher = async (url: string, queryParams?: string) => {
    if (queryParams !== undefined) {
      const res = await fetch(url + queryParams);
      return await res.json();
    }
    const res_1 = await fetch(url);
    return await res_1.json();
  };
  const { data, error } = useSWR<UserTopItems<ArtistItems>, Error>(["/api/artists", queryParams], fetcher);

  function getShortTermArtist() {
    setQueryParams("?range=short");
  }
  function getLongTermArtist() {
    setQueryParams("?range=long");
  }
  function getMediummTermArtist() {
    setQueryParams(undefined);
  }

  return (
    <>
      <Head>
        <title>Spoti'stats</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      <Layout>
        <PeriodChoice
          getShortTermArtist={getShortTermArtist}
          getLongTermArtist={getLongTermArtist}
          getMediummTermArtist={getMediummTermArtist}
        />
        <section className={artist__container}>
          {error && <p>Une Erreur est survenue...</p>}
          {!data && <Loader />}
          {data !== undefined && (
            <>
              {data.items.map((item, i) => {
                return <ArtistCard key={item?.name} i={i + 1} items={item} />;
              })}
            </>
          )}
        </section>
      </Layout>
    </>
  );
};

export default Artist;
