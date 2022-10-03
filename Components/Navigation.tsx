import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

import { Hamburger } from "./Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

export const Navigation = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const { data: session } = useSession();
  const router = useRouter();

  const { container, nav, active } = styles;

  useEffect(() => {
    function toggleHamburger() {
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

  function setActiveLink(href: string) {
    return router.pathname === href ? active : "";
  }

  return (
    <>
      <div className={container}>
        <p>Spoti'stats</p>
        {session && <Hamburger setIsToggle={setIsToggle} isToggle={isToggle} />}
        {session && (isToggle || (innerWidth && innerWidth >= 680)) && (
          <nav className={nav}>
            <ul>
              <li className={setActiveLink("/home/artist")}>
                <Link href="/home/artist">
                  <a>Meilleur artiste</a>
                </Link>
              </li>
              <li className={setActiveLink("/home/track")}>
                <Link href="/home/track">
                  <a>Meilleure chanson</a>
                </Link>
              </li>
              <li className={setActiveLink("/")}>
                <Link href="/">
                  <a>Accueil</a>
                </Link>
              </li>
              <li onClick={() => signOut({ callbackUrl: "/" })}>Se déconnecter</li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};
