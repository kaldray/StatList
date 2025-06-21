import logo from "@src/public/Spotify_Logo_RGB_Black.png";

import type { SpotifyTrackCardPros } from "@src/types/Components";
import styles from "@styles/Components/TrackCard.module.scss";

const SpotifyTrackCard = ({ items, i }: SpotifyTrackCardPros) => {
  const {
    name,
    album: { images },
    artists,
  } = items;

  const { card__container, info__container, logo__container, cover__container } = styles;

  return (
    <>
      {images[2] !== undefined && (
        <section className={card__container}>
          <div className={info__container}>
            <div className={cover__container}>
              <img
                alt={"Pochette de " + name}
                src={images[2].url}
                width={images[2].width}
                height={images[2].height}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <ul>
              <li>
                {i} - {name}
              </li>
              <li>{artists[0]?.name}</li>
            </ul>
          </div>
          <a href={items.external_urls.spotify} className={logo__container} target="_blank" rel="noreferrer">
            <img
              alt="Spotify Logo"
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </a>
        </section>
      )}
    </>
  );
};

export default SpotifyTrackCard;
