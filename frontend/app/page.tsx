"use client";

import { useState } from "react";

import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { SubmissionTable } from "@/components/submission-table";
import { useSubmissions } from "@/hooks/use-submissions";

export default function HomePage() {
  const [status, setStatus] = useState("all");
  const [ordering, setOrdering] = useState("-created_at");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useSubmissions({
    status: status === "all" ? undefined : status,
    ordering,
    page,
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
          Loading submissions...
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
          Failed to load submissions.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            ScanOS Intake Queue
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review and manage incoming patient submissions.
          </p>
        </header>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <FilterBar
              status={status}
              ordering={ordering}
              onStatusChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
              onOrderingChange={(value) => {
                setOrdering(value);
                setPage(1);
              }}
            />
          </div>

          {data && data.results.length > 0 ? (
            <>
              <SubmissionTable submissions={data.results} />

              <Pagination
                page={page}
                hasNext={!!data.next}
                hasPrevious={!!data.previous}
                onNext={() => setPage((p) => p + 1)}
                onPrevious={() => setPage((p) => Math.max(1, p - 1))}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
              <p className="text-sm font-medium text-slate-700">
                No submissions found.
              </p>
              <p className="text-sm text-slate-500">
                Try changing the filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}