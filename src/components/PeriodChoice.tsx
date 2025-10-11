import type { RefObject } from "react";
import { useRef, useTransition } from "react";

import styles from "@styles/Components/PeriodChoice.module.scss";

import type { PeriodChoiceProps, PeriodBoutonActionProps } from "@src/types/Components";

const PeriodChoice = ({
  getShortTermArtistAction,
  getMediummTermArtistAction,
  getLongTermArtistAction,
}: PeriodChoiceProps) => {
  const { search__container, active } = styles;
  const shortTermButton = useRef<HTMLButtonElement>(null);
  const mediumTermButton = useRef<HTMLButtonElement>(null);
  const longTermButton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={search__container}>
        <h1>Rechercher par période</h1>
        <div>
          <PeriodBoutonAction
            boutons={[shortTermButton, longTermButton, mediumTermButton]}
            action={getShortTermArtistAction}
            setActiveButton={() => "setActiveButton"}>
            4 dernières semaines
          </PeriodBoutonAction>
          <PeriodBoutonAction
            className={active}
            boutons={[mediumTermButton, longTermButton, shortTermButton]}
            action={getMediummTermArtistAction}
            setActiveButton={() => "setActiveButton"}>
            6 derniers mois
          </PeriodBoutonAction>
          <PeriodBoutonAction
            boutons={[longTermButton, shortTermButton, mediumTermButton]}
            action={getLongTermArtistAction}
            setActiveButton={() => "setActiveButton"}>
            Toute la période
          </PeriodBoutonAction>
        </div>
      </div>
    </>
  );
};
export default PeriodChoice;

export function PeriodBoutonAction({ action, boutons, children, className }: PeriodBoutonActionProps) {
  const [isPending, startTransition] = useTransition();
  const { active } = styles;

  const setActiveButton = (
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
  };

  return (
    <button
      className={className}
      ref={boutons[0]}
      style={{ opacity: isPending ? 0.3 : 1 }}
      onClick={() => {
        startTransition(async () => {
          await action();
          setActiveButton(boutons[0], boutons[1], boutons[2]);
        });
      }}>
      {children}
    </button>
  );
}
