import type { NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";

import { Layout } from "@components/index";

const Home: NextPage = () => {
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
        <button onClick={() => signIn()}>Se connecter</button>
      </Layout>
    </>
  );
};

export default Home;
