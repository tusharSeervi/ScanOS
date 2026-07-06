interface PaginationProps {
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export function Pagination({
  page,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
}: PaginationProps) {
  return (
    <div className="flex w-full items-center justify-between border-t border-slate-200 px-6 py-4">
      <button
        className="select-none inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      <span className="text-sm font-medium text-slate-500">
        Page <span className="text-slate-900">{page}</span>
      </span>

      <button
        className="select-none inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}