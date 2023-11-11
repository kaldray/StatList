import Image from "next/image";
import logo from "../../public/Mono_Full_Black@2x.png";

import { type DeezerTrackCardPros } from "types/Components";
import styles from "@styles/Components/TrackCard.module.scss";

const TrackCard = ({ items, index, isValidating }: DeezerTrackCardPros) => {
  const { card__container, info__container, logo__container, cover__container } = styles;

  const {
    album: { cover_small },
    title,
    artist: { name },
  } = items;

  function extracckSizeFromUrl(cover: string): number {
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
      <section style={{ opacity: isValidating ? 0.3 : 1 }} className={card__container}>
        <div className={info__container}>
          <div className={cover__container}>
            <Image
              alt={"Pochette de " + name}
              priority={true}
              quality={"100"}
              src={cover_small}
              width={extracckSizeFromUrl(cover_small)}
              height={extracckSizeFromUrl(cover_small)}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <ul>
            <li>{title}</li>
            <li>
              {index} - {name}
            </li>
          </ul>
        </div>
        <div className={logo__container}>
          <Image
            alt="Deezer Logo"
            priority={true}
            quality={"100"}
            src={logo}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default TrackCard;
