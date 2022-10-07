import React from "react";
import Image from "next/image";

import { ArtistCardProps } from "types";

import styles from "@styles/Components/Card.module.scss";

const ArtistCard = ({ items, i }: ArtistCardProps) => {
  const { card__container } = styles;
  const { images, name } = items;

  return (
    <>
      <section className={card__container}>
        <figure>
          <Image
            alt={name}
            loading="lazy"
            quality={"100"}
            src={images[0].url}
            width={images[0].width}
            height={images[0].height}
            objectFit="cover"
          />
          <figcaption>
            {i} - {name}
          </figcaption>
        </figure>
      </section>
    </>
  );
};

export default ArtistCard;
