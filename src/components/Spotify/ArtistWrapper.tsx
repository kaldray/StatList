import { lazy, Suspense } from "react";
import type { WrapperPropsArtist } from "@src/types/Components";
import { CardLoader, NoData } from "@components/index";
import styles from "@styles/Pages/global.module.scss";

const SpotifyArtistCard = lazy(async () => await import("@src/components/Spotify/SpotifyArtistCard"));

export const ArtistWrapper = ({ tracks }: WrapperPropsArtist) => {
  const { container } = styles;

  return (
    <>
      <section className={container}>
        {
          <>
            {tracks.items.map((item, i) => {
              return (
                <>
                  <Suspense key={item.id} fallback={<CardLoader />}>
                    <SpotifyArtistCard i={i + 1 + tracks.offset} items={item} />
                  </Suspense>
                </>
              );
            })}
          </>
        }
        {tracks.items.length === 0 && <NoData />}
      </section>
    </>
  );
};
