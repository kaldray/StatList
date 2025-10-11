import type { ButtonHTMLAttributes, Dispatch, PropsWithChildren, RefObject, SetStateAction } from "react";
import type { ArtistItems, QueryItems, TrackItems, UserTopItems } from "../spotify/index";

export interface SpotifyArtistCardProps {
  items: ArtistItems;
  i: number;
}

export interface SpotifyTrackCardPros {
  items: TrackItems;
  i: number;
}

export interface PaginationProps {
  nextPageAction: () => Promise<void>;
  previousPageAction: () => Promise<void>;
  previousIsActive: boolean;
  nextIsActive: boolean;
  dataLenght: number;
}

export interface PeriodChoiceProps {
  getShortTermArtistAction: () => Promise<void>;
  getMediummTermArtistAction: () => Promise<void>;
  getLongTermArtistAction: () => Promise<void>;
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

export type PeriodBoutonActionProps = {
  action: () => Promise<void>;
  boutons: [
    RefObject<HTMLButtonElement | null>,
    RefObject<HTMLButtonElement | null>,
    RefObject<HTMLButtonElement | null>,
  ];
  setActiveButton: (
    activeButton: RefObject<HTMLButtonElement | null>,
    button2: RefObject<HTMLButtonElement | null>,
    button3: RefObject<HTMLButtonElement | null>,
  ) => void;
} & PropsWithChildren &
  ButtonHTMLAttributes<"button">;
