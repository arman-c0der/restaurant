import Link from "next/link";
import { getReservations } from "@/app/action/reservation.actions";
import ReservationActions from "@/components/admin/ReservationActions";

export const dynamic = "force-dynamic";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_STYLE = {
  pending: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  confirmed: "border-emerald-700 bg-emerald-950 text-emerald-400",
  cancelled: "border-slate-700 bg-slate-800 text-slate-400",
};

function formatDate(key) {
  return new Date(key + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminReservationsPage({ searchParams }) {
  const { status = "all" } = await searchParams;
  const all = await getReservations();

  const counts = {
    all: all.length,
    pending: all.filter((r) => r.status === "pending").length,
    confirmed: all.filter((r) => r.status === "confirmed").length,
    cancelled: all.filter((r) => r.status === "cancelled").length,
  };

  const reservations =
    status === "all" ? all : all.filter((r) => r.status === status);

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white">Reservations</h1>
      <p className="mt-1 text-sm text-slate-400">
        {counts.pending} pending, {counts.confirmed} confirmed
      </p>

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={t.key === "all" ? "/admin/reservations" : `/admin/reservations?status=${t.key}`}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              status === t.key
                ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40"
                : "bg-slate-900 text-slate-400 ring-1 ring-slate-800 hover:text-white"
            }`}
          >
            {t.label} <span className="ml-1 text-xs opacity-70">{counts[t.key]}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Reference</th>
              <th className="px-5 py-3 font-medium">Guest</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Date & Time</th>
              <th className="px-5 py-3 font-medium">Guests</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  No reservations found.
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-slate-800/40">
                  <td className="px-5 py-3 font-mono text-xs text-amber-400">{r.reference}</td>
                  <td className="px-5 py-3 font-medium text-white">{r.name}</td>
                  <td className="px-5 py-3">
                    <a href={`mailto:${r.email}`} className="block text-slate-300 hover:text-amber-400">
                      {r.email}
                    </a>
                    <a href={`tel:${r.phone}`} className="block text-xs text-slate-400 hover:text-amber-400">
                      {r.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-slate-200">
                      {formatDate(r.date)}
                      {r.date === today && (
                        <span className="ml-2 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
                          TODAY
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400">{r.time}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{r.guests}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded border px-2 py-0.5 text-[11px] font-semibold capitalize ${STATUS_STYLE[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <ReservationActions id={r.id} name={r.name} status={r.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}