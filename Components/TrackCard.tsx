import React from "react";
import Image from "next/image";

import { TrackCardPros } from "types";
import styles from "@styles/Components/TrackCard.module.scss";

export const TrackCard = ({ items, i }: TrackCardPros) => {
  const {
    name,
    album: { images },
    artists,
  } = items;
  const { card__container } = styles;
  return (
    <>
      {items && (
        <section className={card__container}>
          <Image loading="lazy" quality={"100"} src={images[2].url} width={images[2].width} height={images[2].height} />
          <ul>
            <li>
              {i} - {name}
            </li>
            <li>{artists[0].name}</li>
          </ul>
        </section>
      )}
    </>
  );
};
