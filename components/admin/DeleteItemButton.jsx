"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { deleteItem } from "@/app/action/admin.actions";

export default function DeleteItemButton({ id, name }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm(`"${name}" delete korben? Eta ar ferot ana jabe na.`)) return;

    startTransition(async () => {
      const res = await deleteItem(id);
      if (res?.ok) {
        router.refresh();
      } else {
        window.alert(res?.error || "Delete kora gelo na.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      aria-label={`Delete ${name}`}
      title="Delete"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}