import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Hamburger } from "./Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

export const Navigation = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const { container, nav } = styles;

  useEffect(() => {
    function toggleHamburger() {
      setInnerWidth(window.innerWidth);
    }
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      if (window.innerWidth > 580) setIsToggle(false);
    }
    window.addEventListener("resize", toggleHamburger);
    return () => {
      window.removeEventListener("resize", toggleHamburger);
    };
  }, []);

  return (
    <>
      <div className={container}>
        <p>Spoti'stats</p>
        <Hamburger setIsToggle={setIsToggle} isToggle={isToggle} />
        {(isToggle || (innerWidth && innerWidth > 580)) && (
          <nav className={nav}>
            <ul>
              <li>
                <Link href="/">
                  <a>Meilleur Artiste</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Meilleur Chanson</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Meilleur Artiste</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};
