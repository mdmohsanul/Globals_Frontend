import  api  from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import type{ ApiResponse, FormSchemaType } from "../utils/types/form";

export async function fetchActiveForm(): Promise<FormSchemaType> {
  try {
    const res = await api.get<ApiResponse<FormSchemaType>>("/form/active");
console.log(res)
    return res?.data.data; // ApiResponse { statusCode, message, data }
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Failed to load form schema";

    throw new Error(message);
  }
}
export function useActiveForm() {
  return useQuery({
    queryKey: ["active-form"],
    queryFn: fetchActiveForm,
  });
}
