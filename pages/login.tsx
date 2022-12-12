import { FC } from "react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";

import { InferGetServerSidePropsType } from "next";
import { getServerSideProvidersType } from "types/next";

import style from "@styles/Pages/login.module.scss";

const Login: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ providers }) => {
  async function logIn(provider: ClientSafeProvider["id"]): Promise<void> {
    await signIn(provider, { callbackUrl: `/${provider}` });
  }
  return (
    <>
      <section className={style.container}>
        <div>
          {providers != null &&
            Object.values(providers).map((provider) => (
              <button key={provider.id} onClick={async () => await logIn(provider.id)}>
                Se connecter avec {provider.name}
              </button>
            ))}
        </div>
      </section>
    </>
  );
};

export default Login;

export async function getServerSideProps(): Promise<getServerSideProvidersType> {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
