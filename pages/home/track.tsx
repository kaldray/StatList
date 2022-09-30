import { useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Error from "next/error";

import type { NextPage } from "next";
import { TrackItems, UserTopItems } from "types";

import { Layout, PeriodChoice, TrackCard, Loader } from "@components/index";
import styles from "@styles/Pages/artist.module.scss";

const Track: NextPage = () => {
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
  const { data, error } = useSWR<UserTopItems<TrackItems>, Error>(["/api/tracks", queryParams], fetcher);

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
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
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
                return <TrackCard key={item?.id} i={i + 1} items={item} />;
              })}
            </>
          )}
        </section>
      </Layout>
    </>
  );
};

export default Track;
