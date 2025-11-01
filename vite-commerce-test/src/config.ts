// Central configuration for runtime values (Vite env-aware)
// Reads VITE_API_BASE_URL from import.meta.env when available, otherwise falls back.

const envBase = (import.meta as any)?.env?.VITE_API_BASE_URL;
export const BASE_URL: string =
  (envBase as string) ?? "https://fakestoreapi.com";
