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
            src={images[1].url}
            width={images[1].width}
            height={images[1].height}
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
