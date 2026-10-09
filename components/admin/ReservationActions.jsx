"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Trash2, XCircle } from "lucide-react";
import {
  updateReservationStatus,
  deleteReservation,
} from "@/app/action/reservation.actions";

const btn =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export default function ReservationActions({ id, name, status }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function run(fn) {
    startTransition(async () => {
      const res = await fn();
      if (res?.ok) router.refresh();
      else window.alert(res?.error || "Something went wrong.");
    });
  }

  function onDelete() {
    if (!window.confirm(`"${name}" er reservation delete korben?`)) return;
    run(() => deleteReservation(id));
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {pending && <Loader2 className="h-4 w-4 animate-spin text-amber-400" />}

      {status !== "confirmed" && (
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => updateReservationStatus(id, "confirmed"))}
          title="Confirm"
          aria-label={`Confirm ${name}`}
          className={`${btn} hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400`}
        >
          <Check className="h-4 w-4" />
        </button>
      )}

      {status !== "cancelled" && (
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => updateReservationStatus(id, "cancelled"))}
          title="Cancel"
          aria-label={`Cancel ${name}`}
          className={`${btn} hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400`}
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}

      <button
        type="button"
        disabled={pending}
        onClick={onDelete}
        title="Delete"
        aria-label={`Delete ${name}`}
        className={`${btn} hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}