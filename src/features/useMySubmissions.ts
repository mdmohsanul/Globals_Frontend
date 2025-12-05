import api from "@/api/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginatedSubmissionResponse } from "@/utils/types/submission";

export function useMySubmissions(page: number = 1, limit: number = 5) {
  return useQuery<PaginatedSubmissionResponse>({
    queryKey: ["my-submissions", page, limit],
    queryFn: async () => {
      const res = await api.get(
        `/submission/allSubmission?page=${page}&limit=${limit}`
      );
      console.log(res);
      return res.data.data as PaginatedSubmissionResponse;
    },
    placeholderData: keepPreviousData,
  });
}
