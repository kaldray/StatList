"use client";

import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn, signOut } from "next-auth/react";

import React from "react";

export const LoginButton = () => {
  return (
    <>
      <button onClick={async () => await signIn()}>Se connecter</button>
    </>
  );
};

export const LoginWithProviderButton = ({ provider }: { provider: ClientSafeProvider }) => {
  async function logIn(provider: ClientSafeProvider["id"]): Promise<void> {
    await signIn(provider, { callbackUrl: `/${provider}` });
  }
  return (
    <button key={provider.id} onClick={async () => await logIn(provider.id)}>
      Se connecter avec {provider.name}
    </button>
  );
};

export const LogOutButton = () => {
  async function logout(): Promise<void> {
    await signOut({ callbackUrl: "/" });
  }
  return (
    <>
      <li onClick={async () => await logout()}>Se déconnecter</li>
    </>
  );
};
