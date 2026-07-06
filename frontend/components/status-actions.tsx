"use client";

import { Button } from "@/components/ui/button";
import { Submission } from "@/types/submission";

interface StatusActionsProps {
  status: Submission["status"];
  isPending: boolean;
  onStatusChange: (status: Submission["status"]) => void;
}

export function StatusActions({
  status,
  isPending,
  onStatusChange,
}: StatusActionsProps) {
  if (status === "approved" || status === "rejected") {
    return (
      <p className="text-sm font-medium text-slate-500">
        ✓ Workflow complete. No further actions available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {status === "new" && (
        <Button
          onClick={() => onStatusChange("in_review")}
          disabled={isPending}
        >
          Move to In Review
        </Button>
      )}

      {status === "in_review" && (
        <>
          <Button
            onClick={() => onStatusChange("approved")}
            disabled={isPending}
          >
            Approve
          </Button>

          <Button
            variant="destructive"
            onClick={() => onStatusChange("rejected")}
            disabled={isPending}
          >
            Reject
          </Button>
        </>
      )}
    </div>
  );
}