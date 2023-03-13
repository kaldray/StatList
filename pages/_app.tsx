import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@components/index";
import { Lato } from "next/font/google";
import "@styles/Global/reset.scss";

const lato = Lato({
  weight: ["400", "700", "900", "300"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={lato.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
