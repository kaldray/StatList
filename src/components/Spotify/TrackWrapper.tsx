import { lazy, Suspense } from "react";

import type { WrapperPropsTrack } from "@src/types/Components";

import { NoData, TrackLoader } from "@components/index";

import styles from "@styles/Pages/global.module.scss";

const SpotifyTrackCard = lazy(async () => await import("@src/components/Spotify/SpotifyTrackCard"));

export const TracksWrapper = ({ tracks }: WrapperPropsTrack) => {
  const { container } = styles;

  return (
    <>
      <section className={container}>
        {
          <>
            {tracks.items.map((item, i) => {
              return (
                <>
                  <Suspense key={item.id} fallback={<TrackLoader />}>
                    <SpotifyTrackCard i={i + 1 + tracks.offset} items={item} />
                  </Suspense>
                </>
              );
            })}
          </>
        }
        {tracks !== undefined && tracks.items.length === 0 && <NoData />}
      </section>
    </>
  );
};
