import React from "react";
import Image from "next/image";

import { Items } from "types";

import styles from "@styles/Components/Card.module.scss";

export const Card = ({ external_urls, followers, genres, href, id, images, name, popularity, type, uri }: Items) => {
  const { card__container } = styles;
  return (
    <>
      <section className={card__container}>
        <figure>
          <Image loading="lazy" quality={"100"} src={images[1].url} width={images[1].width} height={images[1].height} />
          <figcaption>{name}</figcaption>
        </figure>
      </section>
    </>
  );
};
