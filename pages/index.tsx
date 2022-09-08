import type { NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spoti'stats</title>
        <meta
          name="description"
          content="Application web qui permet de consulter vos stats spotify."
        />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      <h1>Bienvenue sur Spoti'stats</h1>
      <button onClick={() => signIn()}>Se connecter</button>
    </>
  );
};

export default Home;
