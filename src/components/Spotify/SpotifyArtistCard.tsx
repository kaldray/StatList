import logo from "../../public/Spotify_Logo_RGB_Black.png";

import { SpotifyArtistCardProps } from "@src/types/Components";

import styles from "@styles/Components/Card.module.scss";

const SpotifyArtistCard = ({ items, i }: SpotifyArtistCardProps) => {
  const { card__container, logo__container } = styles;
  const { images, name } = items;

  return (
    <>
      <section className={card__container}>
        <figure>
          <figcaption>
            {i} - {name}
          </figcaption>
          {images[0] !== undefined && (
            <img
              alt={name}
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
            <img
              alt="Spotify Logo"
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </a>
        </figure>
      </section>
    </>
  );
};

export default SpotifyArtistCard;
