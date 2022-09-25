import React, { Dispatch, SetStateAction } from "react";

import styles from "@styles/Components/Hamburger.module.scss";

type HamburgerProps = {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  isToggle: boolean;
};

export const Hamburger = ({ setIsToggle, isToggle }: HamburgerProps) => {
  const { container__hamb } = styles;
  return (
    <>
      <div onClick={() => setIsToggle(!isToggle)} className={container__hamb}>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
