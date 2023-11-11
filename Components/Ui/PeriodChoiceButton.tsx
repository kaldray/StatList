import { type RefObject } from "react";
import { Spinner } from "./Spinner";

interface PeriodChoiceButtonProps<T = RefObject<HTMLButtonElement>> {
  showPendingState: (ref: T) => boolean;
  buttons: [T, T, T];
  setActiveButton: (btn1: T, btn2: T, btn3: T) => void;
  getPeriodTermArtist: () => void;
  children: React.ReactNode;
  isPending: boolean;
}

export const PeriodChoiceButton = ({
  getPeriodTermArtist,
  setActiveButton,
  buttons,
  showPendingState,
  children,
}: PeriodChoiceButtonProps) => {
  const [activeBtn, ref2, ref3] = buttons;
  return (
    <button
      role="button"
      type="button"
      aria-pressed="false"
      ref={activeBtn}
      onClick={() => {
        getPeriodTermArtist();
        setActiveButton(activeBtn, ref2, ref3);
      }}>
      {showPendingState(activeBtn) && <Spinner />}
      {children}
    </button>
  );
};
