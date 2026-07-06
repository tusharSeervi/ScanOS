import { api } from "@/lib/axios";
import { PaginatedResponse, Submission } from "@/types/submission";

interface SubmissionFilters {
  status?: string;
  ordering?: string;
  page?: number;
}

export async function getSubmissions(
  filters: SubmissionFilters = {}
): Promise<PaginatedResponse<Submission>> {
  const { data } = await api.get("/submissions/", {
    params: filters,
  });

  return data;
}
export async function getSubmission(id: number | string): Promise<Submission> {
  const { data } = await api.get(`/submissions/${id}/`);
  return data;
}