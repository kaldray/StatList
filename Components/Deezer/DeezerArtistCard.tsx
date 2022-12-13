import { FC } from "react";
import Image from "next/image";
import logo from "../../public/Mono_Full_Black@2x.png";

import { DeezerArtistCardPros } from "types/Components";

import styles from "@styles/Components/Card.module.scss";

const ArtistCard: FC<DeezerArtistCardPros> = ({ items, index }) => {
  const { card__container, logo__container } = styles;

  const { picture_big, name } = items;

  function extractSizeFromUrl(cover: string): number {
    const regex = /^.*([0-9]+([a-zA-Z]+[0-9]+)+).*$/i;
    const arr = cover.split(regex);
    const size = arr[1]?.split("x").at(1);
    if (size === undefined) {
      throw new Error("Missing Cover");
    }
    return parseInt(size);
  }

  return (
    <>
      <section className={card__container}>
        <figure>
          <figcaption>
            {index} - {name}
          </figcaption>

          <Image
            alt={name}
            priority={true}
            quality={"100"}
            src={picture_big}
            width={extractSizeFromUrl(picture_big)}
            height={extractSizeFromUrl(picture_big)}
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
              aspectRatio: "1/1",
            }}
          />
          <div className={logo__container}>
            <Image
              alt="Spotify Logo"
              loading="lazy"
              quality={"100"}
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
        </figure>
      </section>
    </>
  );
};

export default ArtistCard;
