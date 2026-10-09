import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { getAdminItems } from "@/app/action/admin.actions";
import DeleteItemButton from "@/components/admin/DeleteItemButton";

export const dynamic = "force-dynamic";

export default async function AdminItemsPage() {
  const items = await getAdminItems();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Menu Items</h1>
          <p className="mt-1 text-sm text-slate-400">
            {items.length} items in the menu
          </p>
        </div>

        <Link
          href="/admin/items/new"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Image</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Dietary</th>
              <th className="px-5 py-3 font-medium">Badge</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-800/40">
                  <td className="px-5 py-3">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-950">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{item.name}</p>
                      {!item.available && (
                        <span className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-slate-400">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{item.category}</td>
                  <td className="px-5 py-3 font-mono font-semibold text-amber-400">
                    £{item.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.dietary.length === 0 ? (
                        <span className="text-slate-600">-</span>
                      ) : (
                        item.dietary.map((d) => (
                          <span
                            key={d}
                            className="rounded border border-emerald-800 bg-emerald-950 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400"
                          >
                            {d}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {item.badge ? (
                      <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/items/${item.id}/edit`}
                        aria-label={`Edit ${item.name}`}
                        title="Edit"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-colors hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteItemButton id={item.id} name={item.name} />
                    </div>
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