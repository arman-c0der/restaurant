import { getCategoryNames } from "@/app/action/admin.actions";
import ItemForm from "@/components/admin/ItemForm";

export const dynamic = "force-dynamic";

export default async function NewItemPage() {
  const categories = await getCategoryNames();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white">Add Item</h1>
      <p className="mt-1 text-sm text-slate-400">
        Notun dish toiri korun. Image Cloudinary te upload hobe.
      </p>

      <div className="mt-8">
        <ItemForm categories={categories} />
      </div>
    </div>
  );
}