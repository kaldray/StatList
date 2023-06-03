"use client";

import styles from "@styles/Components/Pagination.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";

import { ArtistItems, TrackItems, UserTopItems } from "types/spotify";

export const Pagination = ({
  items,
  next,
  previous,
}: Pick<UserTopItems<ArtistItems | TrackItems>, "items" | "previous" | "next">) => {
  const { pagination__container } = styles;
  const pathname = usePathname();
  const { replace } = useRouter();

  function setNewSearchParams(url: string | null) {
    if (url === null) return;
    const newUrl = new URL(url);
    const params = new URLSearchParams(newUrl.search);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  function setDisableButton(url: string | null) {
    return url === null ? true : false;
  }

  if (items.length === 0) return null;

  return (
    <>
      <div className={pagination__container}>
        <button
          role="button"
          type="button"
          aria-disabled={setDisableButton(previous)}
          disabled={setDisableButton(previous)}
          onClick={() => setNewSearchParams(previous)}>
          Précédent
        </button>
        <button
          aria-disabled={setDisableButton(next)}
          role="button"
          type="button"
          disabled={setDisableButton(next)}
          onClick={() => setNewSearchParams(next)}>
          Suivant
        </button>
      </div>
    </>
  );
};
