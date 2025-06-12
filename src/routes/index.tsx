import { NavLink } from "react-router";

import styles from "@styles/Pages/home.module.scss";

export default function Home() {
  const { presentation__container } = styles;

  return (
    <>
      <title>StatList</title>
      <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <section className={presentation__container}>
        <h1>Bienvenue sur StatList</h1>
        <p>
          Si vous êtes un amoureux de la musique, vous êtes au bon endroit. Sur notre site web, vous pouvez facilement
          consulter vos artistes et titres préférés, quel que soit votre fournisseur de musique.
        </p>
        <p>
          Grâce à notre outil, vous pouvez découvrir <strong> vos artistes les plus écoutés</strong> et{" "}
          <strong>vos titres les plus populaires</strong>, en temps réel.
        </p>
        <p>
          Pour découvrir tout ceci, connectez-vous avec votre compte <strong>Deezer</strong> ou <strong>Spotify</strong>
          .
        </p>
        <NavLink to={"/login"}>Se connecter</NavLink>
      </section>
    </>
  );
}
