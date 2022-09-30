import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";

import { Layout } from "@components/index";
import styles from "@styles/Pages/home.module.scss";
import { getToken } from "next-auth/jwt";
import { getSpotifyMe } from "functions";

const Home: NextPage = ({ userInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { presentation__container } = styles;

  return (
    <>
      <Head>
        <title>Spoti'stats</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <section className={presentation__container}>
          <h1>Bienvenue sur Spoti'stats {userInfo?.display_name} </h1>
          <p>
            Sur ce site vous pouvez visualiser la liste de vos artistes et chansons les plus écouter sur différentes
            période.
          </p>
          <ol>
            <li>Une période courte : les quatres dernière semaines</li>
            <li>Une période moyenne : les six derniers mois</li>
            <li>Une période longue : plusieurs années</li>
          </ol>
          {!userInfo && <p>Pour découvrir tout ceci connecter vous avec votre compte Spotify</p>}
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
