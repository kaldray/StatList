import { z } from "zod/v4";

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
  NEXTAUTH_URL: z.string(),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  DEEZER_CLIENT_ID: z.string(),
  DEEZER_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  USERNAME: z.string(),
  PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
