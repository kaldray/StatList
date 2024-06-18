import Head from "next/head";
import { signIn } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import type { NextPage, GetServerSidePropsContext } from "next";

import styles from "@styles/Pages/home.module.scss";

import { getServerSideUserInfo } from "types/next";

const Home: NextPage = () => {
  const { presentation__container } = styles;
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL, "=========");

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
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
        <button onClick={async () => await signIn()}>Se connecter</button>
      </section>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<getServerSideUserInfo> => {
  const token = await getToken(context);
  console.log(process.env.NEXTAUTH_SECRET, "=========");
  if (token !== null) {
    return {
      redirect: {
        destination: `${token.provider}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
