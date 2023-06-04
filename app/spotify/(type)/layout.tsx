import { PeriodChoice, PeriodChoiceLoader } from "@components/Ui";

import { PropsWithChildren, Suspense } from "react";

export default async function SpotifyLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense fallback={<PeriodChoiceLoader />}>
        <PeriodChoice />
      </Suspense>
      {children}
    </>
  );
}
