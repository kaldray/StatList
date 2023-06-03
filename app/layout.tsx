import { Layout } from "@components/Ui";
import { type Metadata } from "next";
import "@styles/Global/reset.scss";
import { Lato } from "next/font/google";
import { NextAuthProvider } from "@context/NextAuthProvider";

const lato = Lato({
  weight: ["400", "700", "900", "300"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Statlist",
  description: "Application web qui permet de consulter vos stats spotify",
  keywords: ["Spotify", "Statistiques"],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
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
