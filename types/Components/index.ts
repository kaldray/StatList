import { Dispatch, SetStateAction } from "react";
import { ArtistItems, TrackItems } from "../spotify/index";

export interface ArtistCardProps {
  items: ArtistItems;
  i: number;
}

export interface TrackCardPros {
  items: TrackItems;
  i: number;
}

export interface PaginationProps {
  nextPage: () => void;
  previousPage: () => void;
  previousIsActive: boolean;
  nextIsActive: boolean;
}

export interface PeriodChoiceProps {
  getShortTermArtist: () => void;
  getMediummTermArtist: () => void;
  getLongTermArtist: () => void;
}

export interface HamburgerProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  isToggle: boolean;
}

export interface PeriodChoiceStyle {
  search__container: string;
  active: string;
}
