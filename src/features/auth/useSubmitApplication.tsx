import  api  from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

export function useSubmitApplication() {
  return useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
console.log(data)
      const res = await api.post("/submission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    },
  });
}
