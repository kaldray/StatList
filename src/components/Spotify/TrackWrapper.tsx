import { lazy, startTransition, useEffect, useState } from "react";

import type { WrapperPropsTrack } from "@src/types/Components";

import { NoData } from "@components/index";

import styles from "@styles/Pages/global.module.scss";

import Pagination from "@src/components/Pagination";
import { useSearchParams } from "react-router";
const SpotifyTrackCard = lazy(async () => await import("@src/components/Spotify/SpotifyTrackCard"));

export const TrackWrapper = ({ tracks }: WrapperPropsTrack) => {
  const { container } = styles;
  const [, setQueryParams] = useSearchParams();
  const [nextIsActive, setNextIsActive] = useState(false);
  const [previousIsActive, setPreviousIsActive] = useState(false);

  useEffect(() => {
    if (tracks?.next === null) {
      setNextIsActive(true);
    } else {
      setNextIsActive(false);
    }
    if (tracks?.previous === null) {
      setPreviousIsActive(true);
    } else {
      setPreviousIsActive(false);
    }
  }, [tracks.next, tracks.previous]);

  function nextPage(): void {
    if (tracks !== undefined && tracks?.next !== null) {
      const url = new URL(tracks.next);
      const s = new URLSearchParams(url.search);
      s.delete("locale");
      const searchParamsObject = Object.fromEntries(s);
      startTransition(() => setQueryParams((oldParams) => ({ ...oldParams, ...searchParamsObject })));
    }
  }

  function previousPage(): void {
    if (tracks !== undefined && tracks?.previous !== null) {
      const url = new URL(tracks.previous);
      const s = new URLSearchParams(url.search);
      s.delete("locale");
      const searchParamsObject = Object.fromEntries(s);
      startTransition(() => setQueryParams((oldParams) => ({ ...oldParams, ...searchParamsObject })));
    }
  }

  return (
    <>
      <section className={container}>
        {
          <>
            {tracks.items.map((item, i) => {
              return <SpotifyTrackCard key={item.id} i={i + 1 + tracks.offset} items={item} />;
            })}
          </>
        }
        {tracks !== undefined && tracks.items.length === 0 && <NoData />}
      </section>
      {tracks !== undefined && tracks.items.length > 0 && (
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
