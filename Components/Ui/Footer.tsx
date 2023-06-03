import Link from "next/link";
import styles from "@styles/Components/Footer.module.scss";

export const Footer = (): JSX.Element => {
  const { footer__container } = styles;
  return (
    <>
      <footer className={footer__container}>
        <Link href={"/term"}>Condition d&apos;utilisation</Link>
      </footer>
    </>
  );
};
