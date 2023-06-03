"use client";

import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Hamburger } from "./Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

const MemoNavigation = (): JSX.Element => {
  const [isToggle, setIsToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const pathname = usePathname();
  const { data } = useSession();

  const { container, nav } = styles;

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

  function setCurrentPage(href: string): "page" | undefined {
    return pathname === href ? "page" : undefined;
  }

  async function logout(): Promise<void> {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <>
      <header className={container}>
        <p>StatList</p>
        {data?.user.provider !== undefined && innerWidth !== undefined && innerWidth <= 680 && (
          <Hamburger setIsToggle={setIsToggle} isToggle={isToggle} />
        )}
        {data?.user.provider !== undefined && (isToggle || (innerWidth !== undefined && innerWidth >= 680)) && (
          <>
            <nav role={"navigation"} id="nav-items" className={nav}>
              <ul>
                <li>
                  <Link
                    aria-current={setCurrentPage(`/${data.user.provider}/artist`)}
                    href={`/${data.user.provider}/artist`}>
                    Meilleur artiste
                  </Link>
                </li>
                <li>
                  <Link
                    aria-current={setCurrentPage(`/${data.user.provider}/track`)}
                    href={`/${data.user.provider}/track`}>
                    Meilleure chanson
                  </Link>
                </li>
                <li>
                  <Link aria-current={setCurrentPage(`/${data.user.provider}`)} href={`/${data.user.provider}`}>
                    Accueil
                  </Link>
                </li>
                <li onClick={async () => await logout()}>Se déconnecter</li>
              </ul>
            </nav>
          </>
        )}
      </header>
    </>
  );
};

export const Navigation = memo(MemoNavigation);
