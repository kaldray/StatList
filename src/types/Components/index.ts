import type { Dispatch, SetStateAction } from "react";
import type { ArtistItems, QueryItems, TrackItems, UserTopItems } from "../spotify/index";
import type { ArtistData, TrackData } from "../deezer";

export interface SpotifyArtistCardProps {
  items: ArtistItems;
  i: number;
}

export interface SpotifyTrackCardPros {
  items: TrackItems;
  i: number;
}
export interface DeezerTrackCardPros {
  items: TrackData;
  index: number;
  isValidating: boolean;
}

export interface DeezerArtistCardPros {
  items: ArtistData;
  index: number;
  isValidating: boolean;
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

export interface WrapperPropsTrack {
  queryParams?: QueryItems;
  tracks: UserTopItems<TrackItems>;
}

export interface WrapperPropsArtist {
  queryParams?: QueryItems;
  tracks: UserTopItems<ArtistItems>;
}
