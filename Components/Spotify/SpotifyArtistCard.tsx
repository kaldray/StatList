import { FC } from "react";
import Image from "next/image";
import logo from "../../public/Spotify_Logo_RGB_Black.png";

import { SpotifyArtistCardProps } from "types/Components";

import styles from "@styles/Components/Card.module.scss";

const SpotifyArtistCard: FC<SpotifyArtistCardProps> = ({ items, i }) => {
  const { card__container, logo__container } = styles;
  const { images, name } = items;

  return (
    <>
      <div className={card__container}>
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
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
            />
          )}
          <a href={items.external_urls.spotify} className={logo__container}>
            <Image
              alt="Spotify Logo"
              priority={true}
              quality={"100"}
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </a>
        </figure>
      </div>
    </>
  );
};

export default SpotifyArtistCard;
