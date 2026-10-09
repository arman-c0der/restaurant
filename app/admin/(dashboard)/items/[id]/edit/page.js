import { notFound } from "next/navigation";
import { getItemById, getCategoryNames } from "@/app/action/admin.actions";
import ItemForm from "@/components/admin/ItemForm";

export const dynamic = "force-dynamic";

export default async function EditItemPage({ params }) {
  const { id } = await params;

  const [item, categories] = await Promise.all([
    getItemById(id),
    getCategoryNames(),
  ]);

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white">Edit Item</h1>
      <p className="mt-1 text-sm text-slate-400">
        {item.name} er information change korun.
      </p>

      <div className="mt-8">
        <ItemForm categories={categories} item={item} />
      </div>
    </div>
  );
}