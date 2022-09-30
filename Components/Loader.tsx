import React from "react";

import styles from "@styles/Components/Loader.module.scss";

export const Loader = () => {
  const { loader } = styles;
  return (
    <>
      <span className={loader}></span>
    </>
  );
};
