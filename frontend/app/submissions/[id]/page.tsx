"use client";

import { useParams } from "next/navigation";

import { StatusBadge } from "@/components/status-badge";
import { useSubmission } from "@/hooks/use-submission";

export default function SubmissionDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useSubmission(id);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
          Loading submission...
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
          Submission not found.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-sm font-medium text-slate-500">
            Submission Details
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Submission #{data.id}
          </h1>
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Patient Information
            </h2>

            <StatusBadge status={data.status} />
          </div>

          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 px-6 py-6 sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Patient
              </dt>

              <dd className="text-sm font-medium text-slate-900">
                {data.patient_name}
              </dd>
            </div>

            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Age
              </dt>

              <dd className="text-sm font-medium text-slate-900">
                {data.age}
              </dd>
            </div>

            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Phone
              </dt>

              <dd className="text-sm font-medium text-slate-900">
                {data.phone}
              </dd>
            </div>

            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Created
              </dt>

              <dd className="text-sm font-medium text-slate-900">
                {new Date(data.created_at).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </dd>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Primary Concern
              </dt>

              <dd className="text-sm leading-relaxed text-slate-900">
                {data.primary_concern}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}