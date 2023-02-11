import { useEffect, useState, Suspense } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import { ArtistItems, QueryItems, UserTopItems } from "types/spotify";
import { WrapperProps } from "types/Components";

import { ErrorProps } from "next/error";

import { Loader, NoData } from "@components/index";

import styles from "@styles/Pages/global.module.scss";

const Error = dynamic(async () => await import("next/error"));
const ArtistCard = dynamic(async () => await import("@components/Spotify/SpotifyArtistCard"), {
  suspense: true,
});
const Pagination = dynamic(async () => await import("@components/Pagination").then((res) => res.Pagination));

export const ArtistWrapper = ({ queryParams }: WrapperProps): JSX.Element => {
  const { container } = styles;

  const [previousOrNextUrl, setUrl] = useState<string | undefined>(undefined);
  const [nextIsActive, setNextIsActive] = useState<boolean>(false);
  const [previousIsActive, setPreviousIsActive] = useState<boolean>(false);

  const fetcher = async (
    url: string,
    queryParams?: QueryItems,
    previousOrNextUrl?: string
  ): Promise<UserTopItems<ArtistItems>> => {
    if (previousOrNextUrl !== undefined && previousOrNextUrl.includes("?") && queryParams !== undefined) {
      const arr = previousOrNextUrl.split("?");
      const queryOnNextUrl = arr[1];
      if (queryOnNextUrl === undefined) {
        const res = await fetch(url);
        return await res.json();
      }
      if (queryOnNextUrl.includes("&")) {
        const splitUrlParams = queryOnNextUrl.split("&");
        splitUrlParams[2] = queryParams;
        const params = splitUrlParams.join("&");
        const res = await fetch(`${url}?${params}`);
        return await res.json();
      }
      const res = await fetch(`${url}?${queryParams}`);
      return await res.json();
    }
    if (previousOrNextUrl !== undefined && previousOrNextUrl.includes("?")) {
      const arr = previousOrNextUrl.split("?");
      const query = arr[1];
      if (query === undefined) {
        const res = await fetch(url);
        return await res.json();
      }
      const res = await fetch(`${url}?${query}`);
      return await res.json();
    }
    if (queryParams !== undefined) {
      const res = await fetch(`${url}?${queryParams}`);
      return await res.json();
    }
    const res = await fetch(url);
    return await res.json();
  };

  const { data, error } = useSWR<UserTopItems<ArtistItems>, ErrorProps>(
    ["/api/spotify/artists", queryParams, previousOrNextUrl],
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

  function nextPage(): void {
    if (data !== undefined && data?.next !== null) {
      setUrl(data.next);
    }
  }

  function previousPage(): void {
    if (data !== undefined && data?.previous !== null) {
      setUrl(data.previous);
    }
  }

  return (
    <>
      <section className={container}>
        {error != null && <Error statusCode={error.statusCode} />}
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
    </>
  );
};
