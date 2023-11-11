"use client";

import { type RefObject, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "@styles/Components/PeriodChoice.module.scss";

import { type TimeRange } from "types/spotify";
import { PeriodChoiceButton } from "./PeriodChoiceButton";

export const PeriodChoice = (): JSX.Element => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { search__container } = styles;
  const mediumTermButton = useRef<HTMLButtonElement>(null);
  const shortTermButton = useRef<HTMLButtonElement>(null);
  const longTermButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const s = searchParams?.get("time_range");
    if (s === null || s === undefined) {
      mediumTermButton.current?.setAttribute("aria-pressed", "true");
    }
    if (s === "long_term") {
      longTermButton.current?.setAttribute("aria-pressed", "true");
    }
    if (s === "medium_term") {
      mediumTermButton.current?.setAttribute("aria-pressed", "true");
    }
    if (s === "short_term") {
      shortTermButton.current?.setAttribute("aria-pressed", "true");
    }
    return () => {
      shortTermButton.current?.setAttribute("aria-pressed", "false");
      mediumTermButton.current?.setAttribute("aria-pressed", "false");
      longTermButton.current?.setAttribute("aria-pressed", "false");
    };
  }, [pathname]);

  function showPendingState(button: RefObject<HTMLButtonElement>): boolean {
    if (
      button.current?.getAttribute("aria-pressed") !== null &&
      button.current?.getAttribute("aria-pressed") === "true" &&
      isPending
    ) {
      return true;
    }
    return false;
  }

  function setActiveButton(
    activeButton: RefObject<HTMLButtonElement>,
    button2: RefObject<HTMLButtonElement>,
    button3: RefObject<HTMLButtonElement>
  ): void {
    if (activeButton.current !== null && activeButton.current.getAttribute("aria-pressed") === "false") {
      activeButton.current.setAttribute("aria-pressed", "true");
      button2.current?.setAttribute("aria-pressed", "false");
      button3.current?.setAttribute("aria-pressed", "false");
    }
  }

  function setNewSearchParams({ ...search }: { time_range: TimeRange }, url: string = window.location.search) {
    const params = new URLSearchParams(url);
    params.set(Object.keys(search)[0] as string, Object.values(search)[0] as string);
    if (pathname !== null) {
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }
  }

  function getShortTermArtist(): void {
    setNewSearchParams({ time_range: "short_term" });
  }

  function getLongTermArtist(): void {
    setNewSearchParams({ time_range: "long_term" });
  }

  function getMediummTermArtist(): void {
    setNewSearchParams({ time_range: "medium_term" });
  }

  return (
    <>
      <div className={search__container}>
        <h1>Rechercher par période</h1>
        <div>
          <PeriodChoiceButton
            isPending={isPending}
            buttons={[shortTermButton, mediumTermButton, longTermButton]}
            getPeriodTermArtist={getShortTermArtist}
            setActiveButton={setActiveButton}
            showPendingState={showPendingState}>
            4 dernières semaines
          </PeriodChoiceButton>
          <PeriodChoiceButton
            isPending={isPending}
            buttons={[mediumTermButton, shortTermButton, longTermButton]}
            getPeriodTermArtist={getMediummTermArtist}
            setActiveButton={setActiveButton}
            showPendingState={showPendingState}>
            6 derniers mois
          </PeriodChoiceButton>
          <PeriodChoiceButton
            isPending={isPending}
            buttons={[longTermButton, mediumTermButton, shortTermButton]}
            getPeriodTermArtist={getLongTermArtist}
            setActiveButton={setActiveButton}
            showPendingState={showPendingState}>
            Toute la période
          </PeriodChoiceButton>
        </div>
      </div>
    </>
  );
};
