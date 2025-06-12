import { NavLink as Link } from "react-router";
import styles from "@styles/Components/Footer.module.scss";

export const Footer = () => {
  const { footer__container } = styles;
  return (
    <>
      <footer className={footer__container}>
        <Link to="/term">Condition d&apos;utilisation</Link>
      </footer>
    </>
  );
};
