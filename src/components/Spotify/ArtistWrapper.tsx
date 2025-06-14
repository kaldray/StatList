import { useEffect, useState, Suspense, lazy } from "react";
import useSWR from "swr";

import { Loader, NoData } from "@components/index";

import styles from "@styles/Pages/global.module.scss";
import { WrapperProps } from "@src/types/Components";
import { ArtistItems, QueryItems, UserTopItems } from "@src/types/spotify";

const ArtistCard = lazy(async () => await import("@components/Spotify/SpotifyArtistCard"));
const Pagination = lazy(async () => await import("@components/Pagination"));

export const ArtistWrapper = ({ queryParams }: WrapperProps) => {
  const { container } = styles;

  const [previousOrNextUrl, setUrl] = useState<string | undefined>(undefined);
  const [nextIsActive, setNextIsActive] = useState<boolean>(false);
  const [previousIsActive, setPreviousIsActive] = useState<boolean>(false);

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
        {data !== undefined && (
          <>
            <Suspense fallback={<Loader />}>
              {data.items.map((item, i) => {
                return <ArtistCard key={item.name} i={i + 1 + data.offset} isValidating={isValidating} items={item} />;
              })}
            </Suspense>
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
