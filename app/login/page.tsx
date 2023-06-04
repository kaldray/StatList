import { LoginWithProviderButton } from "@components/Ui";
import style from "@styles/Pages/login.module.scss";
import { getProviders } from "next-auth/react";

export default async function Page() {
  const providers = await getProviders();

  return (
    <>
      <section className={style.container}>
        <div>
          {providers != null &&
            Object.values(providers).map((provider) => (
              <LoginWithProviderButton key={provider.id} provider={provider} />
            ))}
        </div>
      </section>
    </>
  );
}
