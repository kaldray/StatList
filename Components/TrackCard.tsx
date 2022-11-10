import { FC } from "react";
import Image from "next/image";
import logo from "../public/Spotify_Logo_RGB_Black.png";

import { TrackCardPros } from "types/Components";
import styles from "@styles/Components/TrackCard.module.scss";

const TrackCard: FC<TrackCardPros> = ({ items, i }) => {
  const {
    name,
    album: { images },
    artists,
  } = items;

  const { card__container, info__container, logo__container, cover__container } = styles;

  function goToSpotifyUrl(): string {
    return (window.location.href = items.external_urls.spotify);
  }

  return (
    <>
      {items !== undefined && images[2] !== undefined && (
        <section className={card__container}>
          <div className={info__container}>
            <div className={cover__container}>
              <Image
                alt={"Pochette de " + name}
                priority={true}
                quality={"100"}
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
          <div onClick={goToSpotifyUrl} className={logo__container}>
            <Image
              alt="Spotify Logo"
              loading="lazy"
              quality={"100"}
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default TrackCard;
