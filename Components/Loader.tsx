import React from "react";

import styles from "@styles/Components/Loader.module.scss";

export const Loader = () => {
  const { loader, loader__container } = styles;
  return (
    <>
      <section className={loader__container}>
        <span className={loader}></span>
      </section>
    </>
  );
};
