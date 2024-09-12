"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface queryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: queryProviderProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
