import { FC } from "react";

import { useSession } from "next-auth/react";

import { SpotifyNavigation } from "./SpotifyNavigation";
import { DeezerNavigation } from "./DeezerNavigation";

import styles from "@styles/Components/Navigation.module.scss";

export const Navigation: FC = () => {
  const { data: session } = useSession();

  const { container } = styles;

  return (
    <>
      <div className={container}>
        <p>StatList</p>
        {Boolean(session) && session !== null && session.user.provider === "spotify" && <SpotifyNavigation />}
        {Boolean(session) && session !== null && session.user.provider === "deezer" && <DeezerNavigation />}
      </div>
    </>
  );
};
