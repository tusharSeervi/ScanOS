import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getSubmission,
  updateSubmissionStatus,
} from "@/services/submissions";

export function useSubmission(id: number | string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["submission", id],
    queryFn: () => getSubmission(id),
    enabled: !!id,
  });

  const updateStatus = useMutation({
    mutationFn: (status: string) =>
      updateSubmissionStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submission", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });
    },
  });

  return {
    ...query,
    updateStatus,
  };
}