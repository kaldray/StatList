import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Head from "next/head";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { UserTopTracks } from "types/deezer";
import { ErrorProps } from "next/error";

import { Layout, Loader, NoData } from "@components/index";
import styles from "@styles/Pages/artist.module.scss";

const Pagination = dynamic(async () => await import("@components/Pagination").then((res) => res.Pagination));

const DeezerTrackCard = dynamic(async () => await import("@components/Deezer/DeezerTrackCard"), { suspense: true });

const Error = dynamic(async () => await import("next/error"));

const Track: NextPage = () => {
  const { artist__container } = styles;
  const [previousOrNextUrl, setUrl] = useState<string | undefined>(undefined);
  const [nextIsActive, setNextIsDisable] = useState<boolean>(false);
  const [previousIsActive, setPreviousIsDisable] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const fetcher = async (url: string, previousOrNextUrl: string): Promise<UserTopTracks> => {
    if (previousOrNextUrl !== undefined) {
      const arr = previousOrNextUrl.split("?");
      const query = arr[1];
      if (query === undefined) {
        const res = await fetch(url);
        return await res.json();
      }
      const res = await fetch(`${url}?${query}`);
      return await res.json();
    }
    const res = await fetch(url);
    return await res.json();
  };

  const { data, error } = useSWR<UserTopTracks, ErrorProps>(["/api/deezer/tracks", previousOrNextUrl], fetcher);

  useEffect(() => {
    if (data !== undefined && "prev" in data && "next" in data) {
      setPreviousIsDisable(true);
      setNextIsDisable(true);
    } else if (data !== undefined && "prev" in data) {
      setNextIsDisable(true);
      setPreviousIsDisable(false);
    } else if (data !== undefined) {
      setPreviousIsDisable(true);
      setNextIsDisable(false);
    }
  }, [data]);

  function nextPage(): void {
    if (data !== undefined && "next" in data) {
      setUrl(data.next);
      setOffset((prevState) => {
        return prevState + 20;
      });
    }
  }

  function previousPage(): void {
    if (data !== undefined && "prev" in data) {
      setUrl(data?.prev);
      setOffset((prevState) => {
        return prevState - 20;
      });
    }
  }

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preload" href="/api/deezer/tracks" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Layout>
        <section className={artist__container}>
          {error != null && <Error statusCode={error.statusCode} />}
          {data !== undefined &&
            data?.data.length > 0 &&
            data?.data.map((item, index) => {
              return (
                <Suspense fallback={<Loader />} key={item.id}>
                  <DeezerTrackCard index={index + 1 + offset} items={item} />
                </Suspense>
              );
            })}
        </section>
        {data !== undefined && data.data.length > 0 && (
          <Pagination
            nextIsActive={nextIsActive}
            previousIsActive={previousIsActive}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        )}
      </Layout>
    </>
  );
};

export default Track;
