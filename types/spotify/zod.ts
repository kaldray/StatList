import { z } from "zod";

const artistItemsSchema = z.object({
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number(),
  }),
  genres: z.array(z.string()),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number(),
      width: z.number(),
      url: z.string(),
    })
  ),
  name: z.string(),
  popularity: z.number(),
  type: z.literal("artist"),
  uri: z.string(),
});

const albumSchema = z.object({
  album_interface: z.union([z.literal("album"), z.literal("single"), z.literal("compilation")]),
  total_tracks: z.number(),
  available_marlets: z.array(z.string()),
  external_urls: z.object({
    spotify: z.string(),
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number(),
      width: z.number(),
      url: z.string(),
    })
  ),
  name: z.string(),
  realase_date: z.string(),
  release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
  restriction: z.object({
    reason: z.union([z.literal("market"), z.literal("product"), z.literal("explicit")]),
  }),
  interface: z.literal("album"),
  uri: z.string(),
});

const artistSchema = z.object({
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string(),
    total: z.number(),
  }),
  href: z.string(),
  genres: z.array(z.string()),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number(),
      width: z.number(),
      url: z.string(),
    })
  ),
  name: z.string(),
  popularity: z.number(),
  interface: z.string(),
  uri: z.string(),
});

const externalIdsSchema = z.object({
  isrc: z.string(),
  ean: z.string(),
  upc: z.string(),
});

const userInfoSchema = z.object({
  country: z.string(),
  display_name: z.string(),
  explicit_content: z.object({
    filter_enabled: z.boolean(),
    filter_locked: z.literal(false),
  }),
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number(),
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number(),
      width: z.number(),
      url: z.string(),
    })
  ),
  product: z.union([z.literal("premium"), z.literal("free"), z.literal("open")]),
  type: z.literal("user"),
  uri: z.string(),
});

const trackItemsSchema = z.object({
  album: albumSchema,
  artists: z.array(artistSchema),
  external_ids: externalIdsSchema,
  external_urls: z.object({
    spotify: z.string(),
  }),
  available_marlets: z.array(z.string()),
  disc_number: z.literal(1),
  duration_ms: z.number(),
  explicit: z.boolean(),
  href: z.string(),
  id: z.string(),
  is_local: z.boolean(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string(),
  track_number: z.number(),
  uri: z.string(),
});

const queryStateSchema = z.union([
  z.literal("short_term"),
  z.literal("long_term"),
  z.literal("medium_term"),
  z.undefined(),
]);

const timeRangeSchema = z.union([z.literal("short_term"), z.literal("long_term"), z.literal("medium_term")]);

export const queryItemsSchema = z.custom<`time_range=${TimeRange}`>((val) => val).optional();

export const userTopTracksItemsSchema = z.object({
  href: z.string(),
  items: z.array(trackItemsSchema),
  limit: z.number(),
  next: z.string().nullable(),
  offset: z.number(),
  previous: z.string().nullable(),
  total: z.number(),
});

export const userTopArtistsItemsSchema = z.object({
  href: z.string(),
  items: z.array(artistItemsSchema),
  limit: z.number(),
  next: z.string().nullable(),
  offset: z.number(),
  previous: z.string().nullable(),
  total: z.number(),
});

export type ArtistItems = z.infer<typeof artistItemsSchema>;
export type Album = z.infer<typeof albumSchema>;
export type Artist = z.infer<typeof artistSchema>;
export type ExternalIds = z.infer<typeof externalIdsSchema>;
export type UserInfo = z.infer<typeof userInfoSchema>;
export type TrackItems = z.infer<typeof trackItemsSchema>;
export type UserTopTracksItems = z.infer<typeof userTopTracksItemsSchema>;
export type UserTopArtistsItems = z.infer<typeof userTopArtistsItemsSchema>;
export type QueryState = z.infer<typeof queryStateSchema>;
export type TimeRange = z.infer<typeof timeRangeSchema>;
export type QueryItems = z.infer<typeof queryItemsSchema>;
