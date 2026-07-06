export type SubmissionStatus =
  | "new"
  | "in_review"
  | "approved"
  | "rejected";

export interface Submission {
  id: number;
  patient_name: string;
  age: number;
  phone: string;
  primary_concern: string;
  status: SubmissionStatus;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}