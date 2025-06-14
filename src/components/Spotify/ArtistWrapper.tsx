import { lazy } from "react";
import type { WrapperPropsArtist } from "@src/types/Components";
import { NoData } from "@components/index";
import styles from "@styles/Pages/global.module.scss";

const SpotifyArtistCard = lazy(async () => await import("@src/components/Spotify/SpotifyArtistCard"));

export const ArtistWrapper = ({ tracks }: WrapperPropsArtist) => {
  const { container } = styles;

  // useEffect(() => {
  //   if (data?.next === null) {
  //     setNextIsActive(true);
  //   } else {
  //     setNextIsActive(false);
  //   }
  //   if (data?.previous === null) {
  //     setPreviousIsActive(true);
  //   } else {
  //     setPreviousIsActive(false);
  //   }
  // }, [data]);

  // function nextPage(): void {
  //   if (data !== undefined && data?.next !== null) {
  //     setUrl(data.next);
  //   }
  // }

  // function previousPage(): void {
  //   if (data !== undefined && data?.previous !== null) {
  //     setUrl(data.previous);
  //   }
  // }

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
      {/* {data !== undefined && data.items.length > 0 && (
        <Pagination
          nextIsActive={nextIsActive}
          previousIsActive={previousIsActive}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )} */}
    </>
  );
};
