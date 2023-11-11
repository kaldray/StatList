import type { TrackItems, UserTopItems } from "types/spotify";
import { SpotifyTrackCard } from "./SpotifyTrackCard";
import styles from "@styles/Pages/global.module.scss";

export const Track = async ({ items, offset }: UserTopItems<TrackItems>) => {
  const { container } = styles;
  return (
    <div className={container}>
      {items.map((item, i) => {
        return <SpotifyTrackCard key={item.name} i={i + 1 + offset} items={item} />;
      })}
    </div>
  );
};
