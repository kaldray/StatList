import { FC } from "react";
import styles from "@styles/Components/Loader.module.scss";

export const Loader: FC = () => {
  const { loader, loader__container } = styles;
  return (
    <>
      <section className={loader__container}>
        <span className={loader}></span>
      </section>
    </>
  );
};
