import { Form, NavLink as Link } from "react-router";

// import { Hamburger } from "./Hamburger";

import styles from "@styles/Components/Navigation.module.scss";

type NavigationProps = {
  auth: boolean | null;
  provider: "spotify" | "deezer" | null;
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

  return (
    <>
      <header className={container}>
        <p>StatList</p>
        {auth && provider ? (
          <nav role={"navigation"} id="nav-items" className={nav}>
            <ul>
              <li>
                <Link to={`${provider}/artist`}>Meilleur artiste</Link>
              </li>
              <li>
                <Link to={`${provider}/track`}>Meilleure chanson</Link>
              </li>
              <li>
                <Link to={`${provider}`}>Accueil</Link>
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
