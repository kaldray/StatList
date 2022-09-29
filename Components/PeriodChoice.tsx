import React from "react";

import styles from "@styles/Components/PeriodChoice.module.scss";

type PeriodChoiceProps = {
  getShortTermArtist: () => void;
  getMediummTermArtist: () => void;
  getLongTermArtist: () => void;
};

export const PeriodChoice = ({ getShortTermArtist, getMediummTermArtist, getLongTermArtist }: PeriodChoiceProps) => {
  const { search__container } = styles;
  return (
    <>
      <div className={search__container}>
        <h1>Rechercher par période</h1>
        <div>
          <button onClick={getShortTermArtist}>4 dernière semaine</button>
          <button onClick={getMediummTermArtist}>6 dernier mois</button>
          <button onClick={getLongTermArtist}>Toute le période</button>
        </div>
      </div>
    </>
  );
};
