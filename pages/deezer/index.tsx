import Head from "next/head";
import { getToken } from "next-auth/jwt";

import type { NextPage, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import styles from "@styles/Pages/home.module.scss";

import { getServerSideUserInfo } from "types/next";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { presentation__container } = styles;

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>

      <section className={presentation__container}>
        <h1>Bienvenue sur StatList {token.name}</h1>
        <p>
          Vous êtes connectez avec votre compte <strong>{token.provider}</strong>
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
};

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<getServerSideUserInfo> => {
  const token = await getToken(context);
  if (token === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};
