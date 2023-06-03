import { PeriodChoice } from "@components/Ui/PeriodChoice";
import { PropsWithChildren } from "react";

export default async function SpotifyLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PeriodChoice />
      {children}
    </>
  );
}
