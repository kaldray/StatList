import { Dispatch, SetStateAction } from "react";
import { ArtistItems, TrackItems } from "../spotify/index";

export type ArtistCardProps = {
  items: ArtistItems;
  i: number;
};

export type TrackCardPros = {
  items: TrackItems;
  i: number;
};

export type PaginationProps = {
  nextPage: () => void;
  previousPage: () => void;
  previousIsActive: boolean;
  nextIsActive: boolean;
};

export type PeriodChoiceProps = {
  getShortTermArtist: () => void;
  getMediummTermArtist: () => void;
  getLongTermArtist: () => void;
};

export type HamburgerProps = {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  isToggle: boolean;
};
