import useSWR from "swr";
import Head from "next/head";
import Error from "next/error";

import type { NextPage } from "next";
import { UserTopItems } from "types";

import { Layout, Card } from "@components/index";

const Home: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<UserTopItems, Error>("/api/artists", fetcher);

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
        {data !== undefined && (
          <>
            {data.items.map((item) => {
              return <Card key={item?.name} {...item} />;
            })}
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
