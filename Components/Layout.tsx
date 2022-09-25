import React from "react";
import { Navigation } from "./Navigation";

type LayoutProps = {
  children: JSX.Element;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <section>{children}</section>
    </>
  );
};
