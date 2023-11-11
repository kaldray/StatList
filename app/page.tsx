import styles from "@styles/Pages/home.module.scss";
import { type Metadata } from "next";
import { LoginButton } from "../Components/Ui/ClientActionButton";

export const metadata: Metadata = {
  title: {
    default: "Statlist",
    template: "| Stalist",
  },
  description: "Application web qui permet de consulter vos stats spotify",
  keywords: ["Spotify", "Statistiques"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Stalist",
    url: "/",
  },
};

export default async function Page(): Promise<JSX.Element> {
  const { presentation__container } = styles;

  return (
    <>
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
        <LoginButton />
      </section>
    </>
  );
}
