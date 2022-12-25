import { useEffect, useState, Suspense } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import { TrackItems, UserTopItems } from "types/spotify";
import { WrapperProps } from "types/Components";

import { ErrorProps } from "next/error";

import { Loader, NoData, Pagination } from "@components/index";

import styles from "@styles/Pages/global.module.scss";
import SpotifyTrackCard from "./SpotifyTrackCard";

const Error = dynamic(async () => await import("next/error"));

export const TrackWrapper = ({ queryParams }: WrapperProps): JSX.Element => {
  const { container } = styles;
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

  function nextPage(): void {
    if (data != null) {
      setUrl(data.next);
    }
  }

  function previousPage(): void {
    if (data != null) {
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
                <Suspense fallback={<Loader />} key={item.id}>
                  <SpotifyTrackCard i={i + 1 + data.offset} items={item} />
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
