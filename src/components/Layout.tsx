import { Navigation } from "@components/Navigation";

import { Footer } from "./Footer";
import type { Route } from "./+types/Layout";

import styles from "@styles/Components/Layout.module.scss";
import { Outlet } from "react-router";

import { get_session_user, is_statlist_user_connected } from "@src/sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session_has_user = await is_statlist_user_connected(request);
  if (session_has_user) {
    const user = await get_session_user(request);
    return { auth: session_has_user, provider: user.provider };
  }
  return { auth: null, provider: null };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { container } = styles;
  const { auth, provider } = loaderData;

  return (
    <>
      <Navigation auth={auth} provider={provider} />
      <main className={container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
