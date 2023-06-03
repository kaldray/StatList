import { PeriodChoice } from "@components/Ui/PeriodChoice";
import { PropsWithChildren, Suspense } from "react";

export default async function SpotifyLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense fallback={<p>loading....</p>}>
        <PeriodChoice />
      </Suspense>
      {children}
    </>
  );
}
