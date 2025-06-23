import { z } from "zod/v4";

export const envSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
});
