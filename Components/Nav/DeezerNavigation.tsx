import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

import { Hamburger } from "../Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

export const DeezerNavigation: FC = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const { data: session } = useSession();
  const router = useRouter();

  const { container, nav, active } = styles;

  useEffect(() => {
    function toggleHamburger(): void {
      setInnerWidth(window.innerWidth);
    }
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      if (window.innerWidth > 680) setIsToggle(false);
    }
    window.addEventListener("resize", toggleHamburger);
    return () => {
      window.removeEventListener("resize", toggleHamburger);
    };
  }, []);

  function setActiveLink(href: string): string {
    if (typeof active === "undefined") {
      return "";
    }
    return router.pathname === href ? active : "";
  }

  async function logout(): Promise<void> {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <>
      <div className={container}>
        <p>StatList</p>
        {session !== null && <Hamburger setIsToggle={setIsToggle} isToggle={isToggle} />}
        {session !== null && (isToggle || (innerWidth !== undefined && innerWidth >= 680)) && (
          <nav className={nav}>
            <ul>
              <li className={setActiveLink("/deezer/artist")}>
                <Link href="/deezer/artist">Meilleur artiste</Link>
              </li>
              <li className={setActiveLink("/deezer/track")}>
                <Link href="/deezer/track">Meilleure chanson</Link>
              </li>
              <li className={setActiveLink("/")}>
                <Link href="/">Accueil</Link>
              </li>
              <li onClick={async () => await logout()}>Se déconnecter</li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};
