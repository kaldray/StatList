import { LoginWithProviderButton } from "@components/Ui";
import style from "@styles/Pages/login.module.scss";
import { getProviders } from "next-auth/react";

const getProvidersList = async () => {
  const providers = await getProviders();
  return providers;
};

export default async function Page() {
  const providers = await getProvidersList();
  return (
    <>
      <section className={style.container}>
        <div>
          {providers != null &&
            Object.values(providers).map((provider) => <LoginWithProviderButton provider={provider} />)}
        </div>
      </section>
    </>
  );
}
