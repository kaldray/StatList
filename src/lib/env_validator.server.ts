import { z } from "zod/v4";

export const envSchema = z.object({
  NEXTAUTH_URL: z.string(),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  DEEZER_CLIENT_ID: z.string(),
  DEEZER_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
});
