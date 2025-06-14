import { Form, NavLink } from "react-router";

// import { Hamburger } from "./Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

type NavigationProps = {
  auth: boolean | null;
  provider: "spotify" | "deezer" | null | undefined;
};
export const Navigation = ({ auth, provider }: NavigationProps) => {
  const { container, nav } = styles;

  // useEffect(() => {
  //   function toggleHamburger(): void {
  //     setInnerWidth(window.innerWidth);
  //   }
  //   if (typeof window !== "undefined") {
  //     setInnerWidth(window.innerWidth);
  //     if (window.innerWidth > 680) setIsToggle(false);
  //   }
  //   window.addEventListener("resize", toggleHamburger);
  //   return () => {
  //     window.removeEventListener("resize", toggleHamburger);
  //   };
  // }, []);

  function setCurrentPage(href: string): "page" | undefined {
    if (typeof window === "undefined") return undefined;
    return window.location.pathname === href ? "page" : undefined;
  }

  return (
    <>
      <header className={container}>
        <p>StatList</p>
        {auth && provider ? (
          <nav role={"navigation"} id="nav-items" className={nav}>
            <ul>
              <li>
                <NavLink end={true} aria-current={setCurrentPage(`/${provider}/artist`)} to={`${provider}/artist`}>
                  Meilleur artiste
                </NavLink>
              </li>
              <li>
                <NavLink end={true} aria-current={setCurrentPage(`/${provider}/track`)} to={`${provider}/track`}>
                  Meilleure chanson
                </NavLink>
              </li>
              <li>
                <NavLink end={true} aria-current={setCurrentPage(`/${provider}`)} to={`${provider}`}>
                  Accueil
                </NavLink>
              </li>
              <Form action="/logout" method="post">
                <button>Se déconnecter</button>
              </Form>
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
};
