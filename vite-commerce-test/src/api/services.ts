import type { Product } from "./types";
import { BASE_URL } from "../config";

// Centralized API service for all endpoints.
// Add more functions here (getProductById, createProduct, etc.) and export them.

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// default export optional convenience
const api = { getProducts };
export default api;
