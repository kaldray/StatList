import { Link } from "react-router";

import style from "@styles/Pages/login.module.scss";

const providers = [
  {
    id: "spotify",
    name: "Spotify",
  },
  {
    id: "deezer",
    name: "Deezer",
  },
] as const;

export default function Login() {
  return (
    <>
      <section className={style.container}>
        <div>
          {providers != null &&
            providers.map((provider) => {
              return (
                <Link
                  key={provider.id}
                  to={`/api/auth/autorization/${provider.id}`}
                  className={style.button}
                  onClick={() => {}}>
                  {provider.name}
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
}
