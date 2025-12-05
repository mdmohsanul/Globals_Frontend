import api from "@/api/axios";
import type { SubmissionType } from "@/utils/types/submission";
import { useQuery } from "@tanstack/react-query";

export function useMySubmissions() {
  return useQuery<SubmissionType[]>({
    queryKey: ["my-submissions"],
    queryFn: async () => {
      const res = await api.get("/submission/allSubmission");

      return res.data.data; // ApiResponse format
    },
  });
}
