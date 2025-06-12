import { RefObject, useEffect, useRef, FC } from "react";

// import styles from "@styles/Components/PeriodChoice.module.scss";
import styles from "@styles/Components/PeriodChoice.module.scss";

import { PeriodChoiceProps } from "types/Components";

export const PeriodChoice: FC<PeriodChoiceProps> = ({
  getShortTermArtist,
  getMediummTermArtist,
  getLongTermArtist,
}) => {
  const { search__container, active } = styles;
  const mediumTermButton = useRef<HTMLButtonElement>(null);
  const shortTermButton = useRef<HTMLButtonElement>(null);
  const longTermButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof active === "string") {
      mediumTermButton.current?.classList.add(`${active}`);
    }
  }, [active]);

  function setActiveButton(
    activeButton: RefObject<HTMLButtonElement>,
    button2: RefObject<HTMLButtonElement>,
    button3: RefObject<HTMLButtonElement>
  ): void {
    if (
      activeButton.current !== null &&
      typeof active === "string" &&
      !activeButton.current.classList.contains(`${active}`)
    ) {
      activeButton.current.classList.add(`${active}`);
      button2.current?.classList.remove(`${active}`);
      button3.current?.classList.remove(`${active}`);
    }
  }

  return (
    <>
      <div className={search__container}>
        <h1>Rechercher par période</h1>
        <div>
          <button
            ref={shortTermButton}
            onClick={() => {
              getShortTermArtist();
              setActiveButton(shortTermButton, mediumTermButton, longTermButton);
            }}>
            4 dernières semaines
          </button>
          <button
            ref={mediumTermButton}
            onClick={() => {
              getMediummTermArtist();
              setActiveButton(mediumTermButton, shortTermButton, longTermButton);
            }}>
            6 derniers mois
          </button>
          <button
            ref={longTermButton}
            onClick={() => {
              getLongTermArtist();
              setActiveButton(longTermButton, shortTermButton, mediumTermButton);
            }}>
            Toute la période
          </button>
        </div>
      </div>
    </>
  );
};
