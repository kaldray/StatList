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

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("❌ Invalid environment variables. Check that you have all the variables");
  process.exit(1);
}
console.log(result.data);
export const env = result.data;
