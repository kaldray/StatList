import React, { FC, memo } from "react";

import { Navigation } from "@components/Navigation";

import { Footer } from "./Footer";

import styles from "@styles/Components/Layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { container } = styles;
  return (
    <>
      <Navigation />
      <main className={container}>{children}</main>
      <Footer />
    </>
  );
};
