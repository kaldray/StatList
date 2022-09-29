import { useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Error from "next/error";

import type { NextPage } from "next";
import { UserTopItems } from "types";

import { Layout, ArtistCard } from "@components/index";
import styles from "@styles/Pages/Artist.module.scss";

const Home: NextPage = () => {
  const { search__container, artist__container } = styles;
  const [queryParams, setQueryParams] = useState<string | undefined>(undefined);
  const fetcher = async (url: string, queryParams?: string) => {
    if (queryParams !== undefined) {
      const res = await fetch(url + queryParams);
      return await res.json();
    }
    const res_1 = await fetch(url);
    return await res_1.json();
  };
  const { data, error } = useSWR<UserTopItems, Error>(["/api/artists", queryParams], fetcher);

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
        {error && <p>Une Erreur est survenue...</p>}
        {!data && <p>Loading...</p>}
        <div className={search__container}>
          <h1>Rechercher par période</h1>
          <div>
            <button onClick={getShortTermArtist}>4 dernière semaine</button>
            <button onClick={getMediummTermArtist}>6 dernier mois</button>
            <button onClick={getLongTermArtist}>Toute le période</button>
          </div>
        </div>
        <section className={artist__container}>
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

export default Home;
