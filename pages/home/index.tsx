import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  useEffect(() => {
    async function ok() {
      const response = await fetch("/api/me");
      const data = await response.json();
      console.log(data);
    }
    if (session) {
      ok();
    }
    console.log(session);
  }, [session]);

  return (
    <>
      <Head>
        <title>Spoti'stats</title>
        <meta
          name="description"
          content="Application web qui permet de consulter vos stats spotify."
        />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      {session ? (
        <>
          <h1>Signed in as {session.user.username}</h1>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>
        </>
      ) : (
        <>
          <h1>Not signed Home</h1>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
};

export default Home;
