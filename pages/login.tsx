import { getProviders, signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";

import spotify from "../public/spotify.png";
import style from "@styles/Pages/login.module.scss";

const Login = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <section className={style.container}>
        <div>
          <Image src={spotify} width={200} height={200} alt="Spotify Icon" />
          {providers &&
            Object.values(providers).map((provider) => (
              <button key={provider.id} onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Se connecter avec {provider.name}
              </button>
            ))}
        </div>
      </section>
    </>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
