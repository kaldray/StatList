export type UserTopItems = {
  href: string;
  items: Items[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type Items = {
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
  items: Items;
  i: number;
};

export type QueryItems = "short_term" | "long_term" | "medium_term";
