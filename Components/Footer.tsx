import Link from "next/link";
import styles from "@styles/Components/Footer.module.scss";
import { memo } from "react";

export const MemoFooter = (): JSX.Element => {
  const { footer__container } = styles;
  return (
    <>
      <section className={footer__container}>
        <Link href={"/term"}>Condition d&apos;utilisation</Link>
      </section>
    </>
  );
};

export const Footer = memo(MemoFooter);
