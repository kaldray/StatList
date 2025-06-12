import { get_session_user } from "@src/sessions.server";
import type { Route } from "./+types/index";
import styles from "@styles/Pages/home.module.scss";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await get_session_user(request);
  return { name: user.display_name, provider: user.provider };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { presentation__container } = styles;
  const { name, provider } = loaderData;

  return (
    <>
      <section className={presentation__container}>
        <h1>Bienvenue sur StatList {name} </h1>
        <p>
          Vous êtes connectez avec votre compte {provider} <strong></strong>
        </p>
        <p>
          Grâce à notre outil, vous pouvez découvrir <strong> vos artistes les plus écoutés</strong> et{" "}
          <strong>vos titres les plus populaires</strong>, en temps réel.
        </p>
        <p>
          Pour accéder à vos statistiques, rendez-vous sur les pages de <span>meilleur artiste</span> ou{" "}
          <span>de meilleure</span> chanson.
        </p>
      </section>
    </>
  );
}
