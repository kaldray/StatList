declare namespace NodeJS {
  interface ProcessEnv {
    SPOTIFY_CLIENT_SECRET: string;
    DEEZER_CLIENT_SECRET: string;
    DEEZER_CLIENT_ID: string;
    SPOTIFY_CLIENT_ID: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    PASSWORD: string;
    USERNAME: string;
    CI: boolean;
  }
}
