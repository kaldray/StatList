import { UserInfo } from "types/spotify";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, ClientSafeProvider } from "next-auth/react";

export interface getServerSideUserInfo {
  props: {
    userInfo?: UserInfo;
  };
}

export interface getServerSideProvidersType {
  props: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null };
}
