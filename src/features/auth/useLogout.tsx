// src/features/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout"); // backend clears cookie
    },
    onSuccess: () => {
      // Immediately make user = null
      queryClient.setQueryData(["me"], null);
      // And re-fetch for safety
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
