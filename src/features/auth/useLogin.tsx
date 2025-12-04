import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import type { AuthResponse, LoginPayload, User } from "./types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, LoginPayload>({
    mutationFn: async (payload) => {
      try {
        const res = await api.post<AuthResponse<User>>("/auth/login", payload);
        return res.data.data.user;
      } catch (err: any) {
        console.log(err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Login failed. Invalid credentials.";

        // IMPORTANT: throw a clean error so mutateAsync rejects
        throw new Error(msg);
      }
    },

    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
