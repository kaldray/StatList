import { queryOptions } from "@tanstack/react-query";
import { getSpotifyTopTracks } from "./endpoint";
import { z } from "zod/v4";

export const SpotifyQuerySchema = z.object({
  time_range: z.optional(z.union([z.literal("short_term"), z.literal("medium_term"), z.literal("long_term")])),
  limit: z.optional(z.string()),
  offset: z.optional(z.string()),
});

export type SpotifyQueryItems = z.infer<typeof SpotifyQuerySchema>;

export const spotify_query_options = {
  track: (accessToken: string, searchParams?: SpotifyQueryItems) =>
    queryOptions({
      queryKey: ["tracks", searchParams] as const,
      queryFn: async ({ signal }) => {
        return await getSpotifyTopTracks(accessToken, signal, searchParams);
      },
    }),
};
