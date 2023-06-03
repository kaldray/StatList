import SpotifyArtistCard from "@components/Spotify/SpotifyArtistCard";
import { ArtistItems, UserTopItems } from "types/spotify";

import styles from "@styles/Pages/global.module.scss";

export const Artist = async ({ items, offset }: UserTopItems<ArtistItems>) => {
  const { container } = styles;
  return (
    <div className={container}>
      {items.map((item, i) => {
        return <SpotifyArtistCard key={item.name} i={i + 1 + offset} items={item} />;
      })}
    </div>
  );
};
