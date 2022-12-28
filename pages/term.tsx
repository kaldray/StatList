import Head from "next/head";

import { Layout } from "@components/index";

import style from "@styles/Pages/term.module.scss";

const TermOfUse = (): JSX.Element => {
  const { term__container } = style;
  return (
    <>
      <Head>
        <title>StatList</title>
        <meta name="description" content="Application web qui permet de consulter vos stats spotify." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
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
};

export default TermOfUse;
