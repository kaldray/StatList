export interface UserTopItems<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface ArtistItems {
  external_urls: { spotify: string };
  followers: {
    href: number | number;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Array<{ height: number; width: number; url: string }>;
  name: string;
  popularity: number;
  interface: "artist";
  uri: string;
}

export interface TrackItems {
  album: Album;
  artists: Artist[];
  external_ids: ExternalIds;
  external_urls: { spotify: string };
  available_marlets: string[];
  disc_number: 1;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  uri: string;
}

export interface Album {
  album_interface: "album" | "single" | "compilation";
  total_tracks: number;
  available_marlets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{ height: number; width: number; url: string }>;
  name: string;
  realase_date: string;
  release_date_precision: "year" | "month" | "day";
  restriction: {
    reason: "market" | "product" | "explicit";
  };
  interface: "album";
  uri: string;
}

export interface Artist {
  external_urls: { spotify: string };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  genres: string[];
  id: string;
  images: Array<{ height: number; width: number; url: string }>;
  name: string;
  popularity: number;
  interface: string;
  uri: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface UserInfo {
  country: string;
  display_name: string;
  explicit_content: { filter_enabled: boolean; filter_locked: false };
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  images: Array<{ height: number; width: number; url: string }>;
  product: "premium" | "free" | "open";
  type: "user";
  uri: string;
}

export type QueryState = "short_term" | "long_term" | "medium_term" | undefined;

export type TimeRange = "short_term" | "long_term" | "medium_term";

export type QueryItems = `time_range=${TimeRange}` | undefined;

export type AccessTokenResponse =
  | {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
      token_type: string;
    }
  | {
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
    };
