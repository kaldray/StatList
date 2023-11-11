import { Lato } from "next/font/google";
import { type Viewport, type Metadata } from "next";

import { Layout } from "@components/Ui";
import { NextAuthProvider } from "@context/NextAuthProvider";

import "@styles/Global/reset.scss";

const lato = Lato({
  weight: ["400", "700", "900", "300"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Statlist",
  description: "Application web qui permet de consulter vos stats spotify",
  keywords: ["Spotify", "Statistiques"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={lato.className}>
      <body>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
