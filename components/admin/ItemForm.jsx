"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, X } from "lucide-react";
import { createItem, updateItem } from "@/app/action/admin.actions";

const inputCls =
  "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-300";

export default function ItemForm({ categories = [], item = null }) {
  const router = useRouter();
  const isEdit = Boolean(item);
  const original = item?.image || "";

  const fileRef = useRef(null);
  const [preview, setPreview] = useState(original);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const revoke = () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  };

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    revoke();
    setPreview(URL.createObjectURL(file));
  }

  // Notun select kora image bad diye ager image e ferot jay
  function resetImage() {
    revoke();
    setPreview(original);
    if (fileRef.current) fileRef.current.value = "";
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = isEdit
        ? await updateItem(item.id, formData)
        : await createItem(formData);

      if (res?.ok) {
        router.push("/admin/items");
        router.refresh();
      } else {
        setError(res?.error || "Kichu ekta vul hoyeche.");
      }
    });
  }

  // Edit e category ta list e na thakleo (purono data) dropdown e dekhabe
  const categoryOptions =
    item?.category && !categories.includes(item.category)
      ? [item.category, ...categories]
      : categories;

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8 lg:grid-cols-5"
    >
      {/* Image */}
      <div className="lg:col-span-2">
        <span className={labelCls}>Image</span>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-slate-700 bg-slate-950">
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />

              {preview !== original && (
                <button
                  type="button"
                  onClick={resetImage}
                  aria-label="Cancel new image"
                  className="absolute right-2 top-2 rounded-full bg-slate-950/80 p-1.5 text-white hover:bg-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <label
                htmlFor="image"
                className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-2 bg-slate-950/80 py-2 text-xs font-medium text-amber-300 hover:bg-slate-950"
              >
                <ImagePlus className="h-4 w-4" />
                Change image
              </label>
            </>
          ) : (
            <label
              htmlFor="image"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-slate-400 hover:text-amber-400"
            >
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Click kore image select korun</span>
              <span className="text-xs text-slate-500">JPG, PNG, WEBP (max 5MB)</span>
            </label>
          )}
        </div>

        <input
          ref={fileRef}
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="sr-only"
        />
      </div>

      {/* Fields */}
      <div className="space-y-5 lg:col-span-3">
        <div>
          <label htmlFor="name" className={labelCls}>Name</label>
          <input
            id="name"
            name="name"
            required
            defaultValue={item?.name ?? ""}
            placeholder="Beef Lasagna"
            className={inputCls}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={labelCls}>Category</label>
            <select
              id="category"
              name="category"
              required
              defaultValue={item?.category ?? ""}
              className={inputCls}
            >
              <option value="" disabled>Select category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price" className={labelCls}>Price (£)</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={item?.price ?? ""}
              placeholder="14.50"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelCls}>Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={item?.description ?? ""}
            placeholder="Dish er short description..."
            className={inputCls}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="dietary" className={labelCls}>Dietary (comma diye)</label>
            <input
              id="dietary"
              name="dietary"
              defaultValue={item?.dietary?.join(", ") ?? ""}
              placeholder="V, GF"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="allergens" className={labelCls}>Allergens (comma diye)</label>
            <input
              id="allergens"
              name="allergens"
              defaultValue={item?.allergens?.join(", ") ?? ""}
              placeholder="Gluten, Dairy"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="badge" className={labelCls}>Badge (optional)</label>
          <input
            id="badge"
            name="badge"
            defaultValue={item?.badge ?? ""}
            placeholder="Chef's Special"
            className={inputCls}
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            name="available"
            defaultChecked={item ? item.available : true}
            className="h-4 w-4 accent-amber-500"
          />
          Menu te dekhano hobe (available)
        </label>

        {error && (
          <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? "Saving..." : isEdit ? "Save Changes" : "Add Item"}
        </button>
      </div>
    </form>
  );
}