import { getProviders, signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import spotify from "../public/spotify.png";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div>
        <Image src={spotify} width={100} height={100} alt="Spotify Icon" />
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/app/home" })}>
              Se connecter avec{provider.name}
            </button>
          ))}
      </div>
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
