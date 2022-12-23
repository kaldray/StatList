import { Dispatch, SetStateAction } from "react";
import { ArtistItems, QueryItems, TrackItems } from "../spotify/index";
import { ArtistData, TrackData } from "../deezer";

export interface ArtistCardProps {
  items: ArtistItems;
  i: number;
}

export interface TrackCardPros {
  items: TrackItems;
  i: number;
}
export interface DeezerTrackCardPros {
  items: TrackData;
  index: number;
}

export interface DeezerArtistCardPros {
  items: ArtistData;
  index: number;
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

export interface ArtistWrapperProps {
  queryParams: QueryItems;
}
