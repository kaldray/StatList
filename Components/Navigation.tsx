import Link from "next/link";

import { useState, useEffect, FC, memo } from "react";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/router";

import { Hamburger } from "./Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

export const Navigation: FC = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const router = useRouter();
  const { data } = useSession();

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
        <Hamburger setIsToggle={setIsToggle} isToggle={isToggle} />
        {data?.user.provider !== undefined && (isToggle || (innerWidth !== undefined && innerWidth >= 680)) && (
          <nav className={nav}>
            <ul>
              <li className={setActiveLink(`/${data.user.provider}/artist`)}>
                <Link href={`/${data.user.provider}/artist`}>Meilleur artiste</Link>
              </li>
              <li className={setActiveLink(`/${data.user.provider}/track`)}>
                <Link href={`/${data.user.provider}/track`}>Meilleure chanson</Link>
              </li>
              <li className={setActiveLink(`/${data.user.provider}`)}>
                <Link href={`/${data.user.provider}`}>Accueil</Link>
              </li>
              <li onClick={async () => await logout()}>Se déconnecter</li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};
