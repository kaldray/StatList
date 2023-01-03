import React, { FC } from "react";

import { Navigation } from "@components/Navigation";

import { Footer } from "./Footer";

import styles from "@styles/Components/Layout.module.scss";
import { NextFont } from "@next/font/dist/types";

interface LayoutProps {
  children?: React.ReactNode;
  font: NextFont;
}

export const Layout: FC<LayoutProps> = ({ children, font }) => {
  const { container } = styles;
  const style = [font.className, container].join(" ");
  return (
    <>
      <Navigation />
      <main className={style}>{children}</main>
      <Footer />
    </>
  );
};
