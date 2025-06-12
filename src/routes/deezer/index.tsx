import styles from "@styles/Pages/home.module.scss";

export default function Home() {
  const { presentation__container } = styles;

  return (
    <>
      <section className={presentation__container}>
        <h1>Bienvenue sur StatList </h1>
        <p>
          Vous êtes connectez avec votre compte <strong></strong>
        </p>
        <p>
          Grâce à notre outil, vous pouvez découvrir <strong> vos artistes les plus écoutés</strong> et{" "}
          <strong>vos titres les plus populaires</strong>, en temps réel.
        </p>
        <p>
          Pour accéder à vos statistiques, rendez-vous sur les pages de <span>meilleur artiste</span> ou{" "}
          <span>de meilleure</span> chanson.
        </p>
      </section>
    </>
  );
}
