import type { BuiltInProviderType } from "next-auth/providers";
import type { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import type { JWT } from "next-auth/jwt";
import type { TimeRange } from "types/spotify";

export type getServerSideUserInfo = TokenIsInvalid | TokenIsValid | TokenIsValidPageIsNot;

interface TokenIsValid {
  props: {
    token: JWT;
  };
}
interface TokenIsInvalid {
  redirect: {
    destination: string;
    permanent: false;
  };
}

interface TokenIsValidPageIsNot {
  props: Record<string, never>;
}

export interface getServerSideProvidersType {
  props: { providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null };
}

export interface SpotifyPageProps {
  params?: {
    id: string;
  };
  searchParams?: { time_range: TimeRange };
}
