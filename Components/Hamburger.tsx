import React, { useRef } from "react";

import { HamburgerProps } from "types/Components";

import styles from "@styles/Components/Hamburger.module.scss";

export const Hamburger = ({ setIsToggle, isToggle }: HamburgerProps) => {
  const { container__hamb, toggle } = styles;
  const hamb = useRef<HTMLDivElement>(null);

  function toggleHamburger() {
    if (hamb) {
      hamb.current?.classList?.toggle(`${toggle}`);
    }
  }

  return (
    <>
      <div
        ref={hamb}
        onClick={() => {
          setIsToggle(!isToggle);
          toggleHamburger();
        }}
        className={container__hamb}>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
