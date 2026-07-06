import Link from "next/link";

import { Submission } from "@/types/submission";
import { StatusBadge } from "./status-badge";

interface SubmissionTableProps {
  submissions: Submission[];
}

export function SubmissionTable({
  submissions,
}: SubmissionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Patient
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Age
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Phone
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Concern
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created
            </th>

            <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {submissions.map((submission) => (
            <tr
              key={submission.id}
              className="transition-colors hover:bg-slate-50"
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                {submission.patient_name}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-center text-slate-600">
                {submission.age}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                {submission.phone}
              </td>

              <td className="max-w-sm wrap-break-words px-4 py-3 text-slate-600">
                {submission.primary_concern}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-center">
                <StatusBadge status={submission.status} />
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                {new Date(submission.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-center">
                <Link
                  href={`/submissions/${submission.id}`}
                  className="font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}