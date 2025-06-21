import type { RefObject} from "react";
import { useCallback, useEffect, useRef } from "react";

import styles from "@styles/Components/PeriodChoice.module.scss";

import type { PeriodChoiceProps } from "@src/types/Components";
import { useSearchParams } from "react-router";

const PeriodChoice = ({ getShortTermArtist, getMediummTermArtist, getLongTermArtist }: PeriodChoiceProps) => {
  const { search__container, active } = styles;
  const shortTermButton = useRef<HTMLButtonElement>(null);
  const mediumTermButton = useRef<HTMLButtonElement>(null);
  const longTermButton = useRef<HTMLButtonElement>(null);
  const [searchParams] = useSearchParams();
  const activeButton = searchParams.get("time_range");

  const setActiveButton = useCallback(
    (
      activeButton: RefObject<HTMLButtonElement | null>,
      button2: RefObject<HTMLButtonElement | null>,
      button3: RefObject<HTMLButtonElement | null>,
    ) => {
      if (
        activeButton.current !== null &&
        typeof active === "string" &&
        !activeButton.current.classList.contains(`${active}`)
      ) {
        activeButton.current.classList.add(`${active}`);
        button2.current?.classList.remove(`${active}`);
        button3.current?.classList.remove(`${active}`);
      }
    },
    [active],
  );

  useEffect(() => {
    if (activeButton === "short_term") {
      setActiveButton(shortTermButton, mediumTermButton, longTermButton);
    }
    if (activeButton === "medium_term") {
      setActiveButton(mediumTermButton, shortTermButton, longTermButton);
    }
    if (activeButton === "long_term") {
      setActiveButton(longTermButton, shortTermButton, mediumTermButton);
    }
    if (activeButton === null) {
      mediumTermButton.current?.classList.add(`${active}`);
    }
  }, [activeButton, setActiveButton, active]);

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
export default PeriodChoice;
