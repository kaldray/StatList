import { useEffect, useState, Suspense } from "react";
import useSWR from "swr";
import Head from "next/head";
import { ErrorProps } from "next/error";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { ArtistItems, UserTopItems } from "types";

import { Layout, PeriodChoice, Loader, Pagination } from "@components/index";
import styles from "@styles/Pages/artist.module.scss";

const Error = dynamic(() => import("next/error"));
const ArtistCard = dynamic(() => import("@components/ArtistCard"), {
  suspense: true,
});

const Artist: NextPage = () => {
  const { artist__container } = styles;
  const [queryParams, setQueryParams] = useState<string | undefined>(undefined);
  const [previousOrNextUrl, setUrl] = useState<string | null>(null);
  const [nextIsActive, setNextIsActive] = useState<boolean>(false);
  const [previousIsActive, setPreviousIsActive] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const fetcher = async (url: string, queryParams?: string, previousOrNextUrl?: string | null) => {
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

    const res_1 = await fetch(url);
    return await res_1.json();
  };

  const { data, error } = useSWR<UserTopItems<ArtistItems>, ErrorProps>(
    ["/api/artists", queryParams, previousOrNextUrl],
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

  function getShortTermArtist() {
    setQueryParams("short_term");
  }

  function getLongTermArtist() {
    setQueryParams("long_term");
  }

  function getMediummTermArtist() {
    setQueryParams("medium_term");
  }

  function nextPage() {
    if (data) {
      setUrl(data?.next);
    }
    setPageIndex(pageIndex + 1);
  }

  function previousPage() {
    if (data) {
      setUrl(data?.previous);
    }
    setPageIndex(pageIndex - 1);
  }

  return (
    <>
      <Head>
        <title>StatList</title>
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
          {error && <Error statusCode={error.statusCode} />}
          {data !== undefined && (
            <>
              {data.items.map((item, i) => {
                return (
                  <Suspense fallback={<Loader />} key={item.name}>
                    <ArtistCard i={i + 1 + data.offset} items={item} />
                  </Suspense>
                );
              })}
            </>
          )}
        </section>
        <Pagination
          nextIsActive={nextIsActive}
          previousIsActive={previousIsActive}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </Layout>
    </>
  );
};

export default Artist;
