import { useState, useEffect } from "react";
import { NavLink, Form } from "react-router";
import "@styles/Components/Navigation.scss";

type NavigationProps = {
  auth: boolean | null;
  provider: "spotify" | "deezer" | null | undefined;
};

export function Navigation({ auth, provider }: NavigationProps) {
  const [isToggle, setIsToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
      // Fermer le menu automatiquement si on passe en desktop
      if (window.innerWidth > 680) {
        setIsToggle(false);
      }
    }

    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      if (window.innerWidth > 680) setIsToggle(false);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsToggle(!isToggle);
  };

  const closeMenu = () => {
    setIsToggle(false);
  };

  function setCurrentPage(href: string): "page" | undefined {
    if (typeof window === "undefined") return undefined;
    return window.location.pathname === href ? "page" : undefined;
  }
  return (
    <>
      <header className="container">
        <p>StatList</p>

        {auth && provider && (
          <>
            {/* Bouton hamburger (visible uniquement sur mobile) */}
            <button
              className={`hamburger ${isToggle ? "hamburger--active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isToggle}>
              <span className="hamburger__line"></span>
              <span className="hamburger__line"></span>
              <span className="hamburger__line"></span>
            </button>

            {/* Navigation */}
            <nav role="navigation" id="nav-items" className={`nav ${isToggle ? "nav--open" : ""}`}>
              <ul>
                <li>
                  <NavLink
                    prefetch="intent"
                    end={true}
                    aria-current={setCurrentPage(`/${provider}/artist`)}
                    to={`${provider}/artist`}
                    onClick={closeMenu}>
                    Meilleur artiste
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    prefetch="intent"
                    end={true}
                    aria-current={setCurrentPage(`/${provider}/track`)}
                    to={`${provider}/track`}
                    onClick={closeMenu}>
                    Meilleure chanson
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    prefetch="intent"
                    end={true}
                    aria-current={setCurrentPage(`/${provider}`)}
                    to={`${provider}`}
                    onClick={closeMenu}>
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <Form action="/logout" method="post">
                    <button type="submit" onClick={closeMenu}>
                      Se déconnecter
                    </button>
                  </Form>
                </li>
              </ul>
            </nav>
          </>
        )}
      </header>
    </>
  );
}
