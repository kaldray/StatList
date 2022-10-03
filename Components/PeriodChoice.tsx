import React, { RefObject, useEffect, useRef } from "react";

import styles from "@styles/Components/PeriodChoice.module.scss";

type PeriodChoiceProps = {
  getShortTermArtist: () => void;
  getMediummTermArtist: () => void;
  getLongTermArtist: () => void;
};

export const PeriodChoice = ({ getShortTermArtist, getMediummTermArtist, getLongTermArtist }: PeriodChoiceProps) => {
  const { search__container, active } = styles;
  const mediumTermButton = useRef<HTMLButtonElement>(null);
  const shortTermButton = useRef<HTMLButtonElement>(null);
  const longTermButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mediumTermButton) {
      mediumTermButton.current?.classList.add(`${active}`);
    }
  }, []);

  function setActiveButton(
    activeButton: RefObject<HTMLButtonElement>,
    button2: RefObject<HTMLButtonElement>,
    button3: RefObject<HTMLButtonElement>
  ) {
    if (!activeButton.current?.classList.contains(`${active}`)) {
      activeButton.current?.classList.add(`${active}`);
      button2.current?.classList?.remove(`${active}`);
      button3.current?.classList?.remove(`${active}`);
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
            4 dernière semaine
          </button>
          <button
            ref={mediumTermButton}
            onClick={() => {
              getMediummTermArtist();
              setActiveButton(mediumTermButton, shortTermButton, longTermButton);
            }}>
            6 dernier mois
          </button>
          <button
            ref={longTermButton}
            onClick={() => {
              getLongTermArtist();
              setActiveButton(longTermButton, shortTermButton, mediumTermButton);
            }}>
            Toute le période
          </button>
        </div>
      </div>
    </>
  );
};
