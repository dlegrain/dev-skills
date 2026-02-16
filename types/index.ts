/**
 * Types partagés pour le projet
 * Ajoute ici les types utilisés dans plusieurs fichiers
 */

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
