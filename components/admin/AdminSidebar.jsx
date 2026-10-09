"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  PlusCircle,
  CalendarCheck,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Menu Items", href: "/admin/items", icon: UtensilsCrossed },
  { label: "Add Item", href: "/admin/new", icon: PlusCircle },
  { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ user, signOutAction }) {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(href + "/");

  // "Menu Items" ar "Add Item" duto ek shathe active na hoye jay, tai exact check
  const isItemActive = (href) => {
    if (href === "/admin/items") return pathname === "/admin/items";
    return isActive(href);
  };

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-800 bg-slate-900 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      {/* Brand */}
      <div className="border-b border-slate-800 px-6 py-5">
        <p className="font-serif text-xl font-bold text-white">
          The Cheeky Chef
        </p>
        <p className="mt-0.5 text-xs font-medium tracking-[0.2em] text-amber-400">
          ADMIN PANEL
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto p-3 md:flex-col md:overflow-visible">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = isItemActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-amber-400" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-800 p-4">
        <div className="mb-3 px-1">
          <p className="truncate text-sm font-semibold text-white">
            {user?.name}
          </p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}