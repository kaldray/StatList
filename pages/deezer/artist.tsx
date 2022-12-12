import { Suspense } from "react";
import useSWR from "swr";
import Head from "next/head";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { UserTopArtist } from "types/deezer";
import { ErrorProps } from "next/error";

import { Layout, Loader } from "@components/index";
import styles from "@styles/Pages/artist.module.scss";

const DeezerArtistCard = dynamic(async () => await import("@components/Deezer/DeezerArtistCard"), { suspense: true });

const Error = dynamic(async () => await import("next/error"));

const Track: NextPage = () => {
  const { artist__container } = styles;

  const fetcher = async (url: string): Promise<UserTopArtist> => {
    const res = await fetch(url);
    return await res.json();
  };

  const { data, error } = useSWR<UserTopArtist, ErrorProps>("/api/deezer/artists", fetcher);

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preload" href="/api/deezer/artists" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Layout>
        <section className={artist__container}>
          {error != null && <Error statusCode={error.statusCode} />}
          {data !== undefined &&
            data?.data.length > 0 &&
            data?.data.map((item, index) => {
              return (
                <Suspense fallback={<Loader />} key={item.id}>
                  <DeezerArtistCard index={index + 1} items={item} />
                </Suspense>
              );
            })}
        </section>
      </Layout>
    </>
  );
};

export default Track;
