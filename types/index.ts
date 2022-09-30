export type UserTopItems<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type ArtistItems = {
  external_urls: { spotify: string };
  followers: {
    href: number | number;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: { height: number; width: number; url: string }[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type ArtistCardProps = {
  items: ArtistItems;
  i: number;
};

export type TrackCardPros = {
  items: TrackItems;
  i: number;
};

export type TrackItems = {
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
};

export type QueryItems = "short_term" | "long_term" | "medium_term";

export type Album = {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_marlets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: { height: number; width: number; url: string }[];
  name: string;
  realase_date: string;
  release_date_precision: "year" | "month" | "day";
  restriction: {
    reason: "market" | "product" | "explicit";
  };
  type: "album";
  uri: string;
};

export type Artist = {
  external_urls: { spotify: string };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  genres: string[];
  id: string;
  images: { height: number; width: number; url: string }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};
