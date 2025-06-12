/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  VITE_SPOTIFY_CLIENT_SECRET: string;
  VITE_DEEZER_CLIENT_SECRET: string;
  VITE_DEEZER_CLIENT_ID: string;
  VITE_SPOTIFY_CLIENT_ID: string;
  NEXTAUTH_SECRET: string;
  PASSWORD: string;
  USERNAME: string;
  CI: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
