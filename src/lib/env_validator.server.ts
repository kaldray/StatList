import { z } from "zod/v4";

export function validateEnv() {
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
    console.log(result.data);
    console.error("❌ Invalid environment variables. Check that you have all the variables");
    process.exit(1);
  }
  return result.data;
}
