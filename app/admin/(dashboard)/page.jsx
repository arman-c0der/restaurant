import Link from "next/link";
import { UtensilsCrossed, PlusCircle, CalendarCheck, Settings } from "lucide-react";
import { getItems } from "@/app/action/item.actions";

export default async function AdminDashboardPage() {
  const items = await getItems();

  const cards = [
    { label: "Menu Items", href: "/admin/items", icon: UtensilsCrossed, note: `${items.length} items` },
    { label: "Add Item", href: "/admin/new", icon: PlusCircle, note: "Create a new dish" },
    { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck, note: "View bookings" },
    { label: "Settings", href: "/admin/settings", icon: Settings, note: "Site settings" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">Welcome back.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, href, icon: Icon, note }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-amber-400/50"
          >
            <Icon className="h-6 w-6 text-amber-400" />
            <h2 className="mt-4 font-semibold text-white">{label}</h2>
            <p className="mt-1 text-sm text-slate-400">{note}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}