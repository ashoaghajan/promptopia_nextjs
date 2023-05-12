"use client";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: JSX.Element;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
