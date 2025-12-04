import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@/api/axios";
import type { AuthResponse, LoginPayload, User } from "./types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, LoginPayload>({
    mutationFn: async (payload) => {
      const res = await api.post<AuthResponse<User>>("/auth/login", payload);
      return res.data.data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
