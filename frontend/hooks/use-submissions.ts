"use client";

import { useQuery } from "@tanstack/react-query";

import { getSubmissions } from "@/services/submissions";

interface SubmissionFilters {
  status?: string;
  ordering?: string;
  page?: number;
}

export function useSubmissions(filters: SubmissionFilters) {
  return useQuery({
    queryKey: ["submissions", filters],
    queryFn: () => getSubmissions(filters),
  });
}