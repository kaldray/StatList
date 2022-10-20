import { FC } from "react";
import Image from "next/image";
import logo from "../public/Spotify_Logo_RGB_Black.png";

import { ArtistCardProps } from "types/Components";

import styles from "@styles/Components/Card.module.scss";

const ArtistCard: FC<ArtistCardProps> = ({ items, i }) => {
  const { card__container, logo__container } = styles;
  const { images, name } = items;

  function goToSpotifyUrl(): string {
    return (window.location.href = items.external_urls.spotify);
  }

  return (
    <>
      <section className={card__container}>
        <figure>
          <figcaption>
            {i} - {name}
          </figcaption>
          {images[0] !== undefined && (
            <Image
              alt={name}
              priority={true}
              quality={"100"}
              src={images[0].url}
              width={images[0].width}
              height={images[0].height}
              objectFit="cover"
            />
          )}
          <div onClick={goToSpotifyUrl} className={logo__container}>
            <Image layout="intrinsic" alt="Spotify Logo" loading="lazy" quality={"100"} src={logo} />
          </div>
        </figure>
      </section>
    </>
  );
};

export default ArtistCard;
