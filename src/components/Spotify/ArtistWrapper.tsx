import { lazy, startTransition, useEffect, useState } from "react";
import type { WrapperPropsArtist } from "@src/types/Components";
import Pagination from "@src/components/Pagination";
import { NoData } from "@components/index";
import styles from "@styles/Pages/global.module.scss";
import { useSearchParams } from "react-router";

const SpotifyArtistCard = lazy(async () => await import("@src/components/Spotify/SpotifyArtistCard"));

export const ArtistWrapper = ({ tracks }: WrapperPropsArtist) => {
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
  }, [tracks]);

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
              return <SpotifyArtistCard key={item.id} i={i + 1 + tracks.offset} items={item} />;
            })}
          </>
        }
        {tracks !== undefined && tracks.items.length === 0 && <NoData />}
      </section>
      {tracks !== undefined && tracks.items.length > 0 && (
        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          nextIsActive={nextIsActive}
          previousIsActive={previousIsActive}
        />
      )}
    </>
  );
};
