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
});

export const env = envSchema.safeParse(process.env);
console.log(env.data);
if (!env.success) {
  console.error("❌ Invalid environment variables. Check that you have all the variables");
  console.error(env.data);
  process.exit(1);
}
