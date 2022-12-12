import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { JWT } from "next-auth/jwt";

export type getServerSideUserInfo = TokenIsInvalid | TokenIsValid;

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

export interface getServerSideProvidersType {
  props: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null };
}
