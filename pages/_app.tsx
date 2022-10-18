import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@styles/Global/reset.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
