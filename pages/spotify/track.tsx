import { useState, useEffect, Suspense } from "react";
import useSWR from "swr";
import Head from "next/head";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { TrackItems, UserTopItems, QueryItems } from "types/spotify";
import { ErrorProps } from "next/error";

import { Layout, Loader, NoData } from "@components/index";
import styles from "@styles/Pages/global.module.scss";

const Error = dynamic(async () => await import("next/error"));
const TrackCard = dynamic(async () => await import("@components/Spotify/TrackCard"), {
  suspense: true,
});
const Pagination = dynamic(async () => await import("@components/Pagination").then((res) => res.Pagination));
const PeriodChoice = dynamic(async () => await import("@components/PeriodChoice").then((res) => res.PeriodChoice));

const Track: NextPage = () => {
  const { container } = styles;
  const [queryParams, setQueryParams] = useState<QueryItems>(undefined);
  const [previousOrNextUrl, setUrl] = useState<string | null>(null);
  const [nextIsActive, setNextIsActive] = useState<boolean>(false);
  const [previousIsActive, setPreviousIsActive] = useState<boolean>(false);

  const fetcher = async (
    url: string,
    queryParams?: string,
    previousOrNextUrl?: string | null
  ): Promise<UserTopItems<TrackItems>> => {
    if (previousOrNextUrl !== null && previousOrNextUrl !== undefined && queryParams !== undefined) {
      const nextOrPreviousUrl = previousOrNextUrl.split("?").at(1)?.split("&");
      if (nextOrPreviousUrl !== undefined && nextOrPreviousUrl.length >= 2) {
        const limitOffset = nextOrPreviousUrl.slice(0, 2).join("&");
        const res = await fetch(`${url}?time_range=${queryParams}&${limitOffset}`);
        return await res.json();
      }
      const res = await fetch(`${url}?time_range=${queryParams}`);
      return await res.json();
    }

    if (previousOrNextUrl !== null && previousOrNextUrl !== undefined) {
      const nextOrPreviousUrl = previousOrNextUrl.split("?").at(1);
      if (nextOrPreviousUrl !== undefined) {
        const res = await fetch(`${url}?${nextOrPreviousUrl}`);
        return await res.json();
      }
    }

    if (queryParams !== undefined) {
      const res = await fetch(`${url}?time_range=${queryParams}`);
      return await res.json();
    }
    const res = await fetch(url);
    return await res.json();
  };

  const { data, error } = useSWR<UserTopItems<TrackItems>, ErrorProps>(
    ["/api/spotify/tracks", queryParams, previousOrNextUrl],
    fetcher
  );

  useEffect(() => {
    if (data?.next === null) {
      setNextIsActive(true);
    } else {
      setNextIsActive(false);
    }
    if (data?.previous === null) {
      setPreviousIsActive(true);
    } else {
      setPreviousIsActive(false);
    }
  }, [data]);

  function getShortTermArtist(): void {
    setQueryParams("short_term");
  }

  function getLongTermArtist(): void {
    setQueryParams("long_term");
  }

  function getMediummTermArtist(): void {
    setQueryParams("medium_term");
  }

  function nextPage(): void {
    if (data != null) {
      setUrl(data?.next);
    }
  }

  function previousPage(): void {
    if (data != null) {
      setUrl(data?.previous);
    }
  }

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preload" href="/api/tracks" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Layout>
        <PeriodChoice
          getShortTermArtist={getShortTermArtist}
          getLongTermArtist={getLongTermArtist}
          getMediummTermArtist={getMediummTermArtist}
        />
        <section className={container}>
          {error != null && <Error statusCode={error.statusCode} />}
          {data !== undefined && (
            <>
              {data.items.map((item, i) => {
                return (
                  <Suspense fallback={<Loader />} key={item?.id}>
                    <TrackCard i={i + 1 + data.offset} items={item} />
                  </Suspense>
                );
              })}
            </>
          )}
          {data !== undefined && data.items.length === 0 && <NoData />}
        </section>
        {data !== undefined && data.items.length > 0 && (
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
