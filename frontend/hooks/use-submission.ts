import { useQuery } from "@tanstack/react-query";

import { getSubmission } from "@/services/submissions";

export function useSubmission(id: number | string) {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: () => getSubmission(id),
    enabled: !!id,
  });
}