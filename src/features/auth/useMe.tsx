// src/features/auth/useMe.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import type { AuthResponse, User } from "./types";

export function useMe() {
  return useQuery<User | null>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get<AuthResponse<User>>("/auth/me");
      return res.data.data.user ?? null;
    },
    retry: false,
  });
}
