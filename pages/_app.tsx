import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@components/index";
import "@styles/Global/reset.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
