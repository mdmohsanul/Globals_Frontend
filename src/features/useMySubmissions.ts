import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export function useMySubmissions() {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: async () => {
      const res = await api.get("/submission/allSubmission");
      console.log(res)
      return res.data.data; // ApiResponse format
    },
  });
}
