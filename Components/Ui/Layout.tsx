import React from "react";

import { Navigation } from "@components/Ui/Navigation";

import { Footer } from "./Footer";

import styles from "@styles/Components/Layout.module.scss";
import type { PropsWithChildren } from "react";



export const Layout = ({ children }: PropsWithChildren) => {
  const { container } = styles;

  return (
    <>
      <Navigation />
      <main className={container}>{children}</main>
      <Footer />
    </>
  );
};
