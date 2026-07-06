"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  status: string;
  ordering: string;
  onStatusChange: (value: string) => void;
  onOrderingChange: (value: string) => void;
}

export function FilterBar({
  status,
  ordering,
  onStatusChange,
  onOrderingChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-500">
          Status
        </label>

        <Select
          value={status}
          onValueChange={(value: string | null) => {
            if (value) {
              onStatusChange(value);
            }
          }}
        >
          <SelectTrigger className="w-full `min-w-[220px]` sm:w-56">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-500">
          Sort by
        </label>

        <Select
          value={ordering}
          onValueChange={(value) => {
            if (value) {
              onOrderingChange(value);
            }
          }}
        >
          <SelectTrigger className="w-full `min-w-[220px]` sm:w-56">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-created_at">Newest First</SelectItem>
            <SelectItem value="created_at">Oldest First</SelectItem>
            <SelectItem value="patient_name">Patient A–Z</SelectItem>
            <SelectItem value="-patient_name">Patient Z–A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}