import { SubmissionStatus } from "@/types/submission";

interface StatusBadgeProps {
  status: SubmissionStatus;
}

const statusClasses: Record<SubmissionStatus, string> = {
  new: "bg-gray-100 text-gray-800",
  in_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${statusClasses[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}