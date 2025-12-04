import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import type{ RegisterPayload, RegisterResponse } from "./types";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      const res = await api.post("/auth/signup", payload);
      return res.data;
    },
  });
};
