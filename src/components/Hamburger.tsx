import { useRef, FC } from "react";

import { HamburgerProps } from "types/Components";

import styles from "@styles/Components/Hamburger.module.scss";

export const Hamburger: FC<HamburgerProps> = ({ setIsToggle, isToggle }) => {
  const { container__hamb, toggle } = styles;
  const hamb = useRef<HTMLButtonElement>(null);

  function toggleHamburger(): void {
    if (typeof toggle === "string") {
      hamb.current?.classList.toggle(`${toggle}`);
    }
  }

  return (
    <>
      <button
        ref={hamb}
        type="button"
        aria-label="hamburger menu"
        aria-controls="nav-items"
        aria-expanded={isToggle}
        onClick={() => {
          setIsToggle(!isToggle);
          toggleHamburger();
        }}
        className={container__hamb}>
        <span></span>
        <span></span>
      </button>
    </>
  );
};
