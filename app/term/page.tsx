import style from "@styles/Pages/term.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Condition",
    template: "| Stalist",
  },
  description: "Condition d'utilisation du site Statlist",
  keywords: ["Spotify", "Statistiques", "Condition d'utilisation"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Stalist",
    url: "/",
  },
};

export default async function Page() {
  const { term__container } = style;
  return (
    <>
      <section className={term__container}>
        <h1>Condition d&apos;utilisation </h1>
        <p>StatList n&apos;est en aucun cas affilié à Spotify ni Deezer.</p>
        <p>
          L&apos;accès au site et aux services proposés est réservé aux utilisateurs âgés d&apos;au moins 18 ans, ou à
          ceux qui ont l&apos;accord de leurs parents ou tuteurs légaux.
        </p>
        <p>
          L&apos;utilisateur peut révoquer l&apos;accès à ses données personnelles à tout moment en se connectant au
          compte musical avec lequel il a accès.
        </p>
        <p>Le site ne stocke aucune donnée personnelle des utilisateurs.</p>
        <p>
          L&apos;utilisateur est responsable de l&apos;utilisation qu&apos;il fait du site et des services proposés, et
          s&apos;engage à ne pas utiliser ceux-ci dans un but illégal ou contraire aux bonnes mœurs.
        </p>
        <p>
          Le site et les services proposés sont fournis &quot;en l&apos;état&quot; et sans aucune garantie de
          disponibilité ou de performance. Le site web ne peut être tenu responsable des dommages causés à
          l&apos;utilisateur ou à des tiers du fait de l&apos;utilisation des services proposés.
        </p>
      </section>
    </>
  );
}
