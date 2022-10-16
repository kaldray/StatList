import Head from "next/head";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";

import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";

import { Layout } from "@components/index";
import { getSpotifyMe } from "@providers/spotify";

import styles from "@styles/Pages/home.module.scss";

const Home: NextPage = ({ userInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { presentation__container } = styles;

  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      <Layout>
        <section className={presentation__container}>
          <h1>Bienvenue sur StatList {userInfo?.display_name} </h1>
          <p>
            Sur ce site vous pouvez visualiser la liste de vos artistes et chansons les plus écoutées sur différentes
            périodes.
          </p>
          <ol>
            <li>Une période courte : les quatre dernières semaines.</li>
            <li>Une période moyenne : les six derniers mois.</li>
            <li>Une période longue : plusieurs années.</li>
          </ol>
          {!userInfo && <p>Pour découvrir tout ceci connectez vous avec votre compte Spotify.</p>}
          {!userInfo ? <button onClick={() => signIn()}>Se connecter</button> : null}
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = await getToken(context);
  if (!token?.accessToken) {
    return {
      props: {},
    };
  }
  const userInfo = await getSpotifyMe(token?.accessToken);

  return {
    props: {
      userInfo,
    },
  };
};

export default Home;
