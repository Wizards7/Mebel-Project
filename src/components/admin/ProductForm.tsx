"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload,
  Star,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface ProductImageItem {
  url: string;
  isMain: boolean;
  sortOrder: number;
}

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  isEdit?: boolean;
}

export default function ProductForm({
  initialData,
  categories,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId || categories[0]?.id || ""
  );
  const [isPriceOnRequest, setIsPriceOnRequest] = useState(
    initialData ? initialData.price === null || initialData.price === undefined : false
  );
  const [price, setPrice] = useState<string>(
    initialData?.price ? String(initialData.price) : ""
  );
  const [currency, setCurrency] = useState(initialData?.currency || "сомонӣ");
  const [size, setSize] = useState(initialData?.size || "");
  const [material, setMaterial] = useState(initialData?.material || "");
  const [deliveryAvailable, setDeliveryAvailable] = useState(
    initialData ? Boolean(initialData.deliveryAvailable) : true
  );
  const [assemblyAvailable, setAssemblyAvailable] = useState(
    initialData ? Boolean(initialData.assemblyAvailable) : true
  );
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [status, setStatus] = useState<"ACTIVE" | "HIDDEN">(
    initialData?.status === "HIDDEN" ? "HIDDEN" : "ACTIVE"
  );
  const [description, setDescription] = useState(initialData?.description || "");

  // Included items list
  const [includedItems, setIncludedItems] = useState<string[]>(
    initialData?.includedItems || ["Шкаф", "Тумбочка", "Комод", "Диван"]
  );
  const [newItemText, setNewItemText] = useState("");

  // Multi-images
  const [images, setImages] = useState<ProductImageItem[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images.map((img: any, idx: number) => ({
          url: img.url,
          isMain: img.isMain ?? idx === 0,
          sortOrder: img.sortOrder ?? idx,
        }))
      : [
          {
            url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
            isMain: true,
            sortOrder: 0,
          },
        ]
  );

  const [customImageUrl, setCustomImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Add Item to Included Items List
  const handleAddIncludedItem = () => {
    if (!newItemText.trim()) return;
    setIncludedItems([...includedItems, newItemText.trim()]);
    setNewItemText("");
  };

  const handleRemoveIncludedItem = (idx: number) => {
    setIncludedItems(includedItems.filter((_, i) => i !== idx));
  };

  // Image File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Боркунӣ ноком шуд");

      const newImageItems: ProductImageItem[] = data.urls.map((url: string, index: number) => ({
        url,
        isMain: images.length === 0 && index === 0,
        sortOrder: images.length + index,
      }));

      setImages([...images, ...newImageItems]);
    } catch (err: any) {
      setError(err.message || "Хатогӣ ҳангоми боркунии файл");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add Image via URL
  const handleAddImageUrl = () => {
    if (!customImageUrl.trim()) return;
    setImages([
      ...images,
      {
        url: customImageUrl.trim(),
        isMain: images.length === 0,
        sortOrder: images.length,
      },
    ]);
    setCustomImageUrl("");
  };

  // Set Main Image
  const handleSetMainImage = (targetIndex: number) => {
    setImages(
      images.map((img, idx) => ({
        ...img,
        isMain: idx === targetIndex,
      }))
    );
  };

  // Reorder images
  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const reordered = [...images];
    const item = reordered.splice(fromIndex, 1)[0];
    reordered.splice(toIndex, 0, item);
    setImages(reordered.map((img, idx) => ({ ...img, sortOrder: idx })));
  };

  // Delete image
  const handleDeleteImage = (index: number) => {
    const filtered = images.filter((_, idx) => idx !== index);
    // If we deleted the main image, make the first one main
    if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
      filtered[0].isMain = true;
    }
    setImages(filtered);
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      setError("Ҳадди аққал як акс барои маҳсулот ҳатмист.");
      return;
    }

    setSaving(true);

    const payload = {
      name,
      categoryId,
      price: isPriceOnRequest ? null : Number(price) || null,
      currency,
      size,
      material,
      includedItems,
      deliveryAvailable,
      assemblyAvailable,
      featured,
      status,
      description,
      images,
    };

    try {
      const url = isEdit
        ? `/api/admin/products/${initialData.id}`
        : "/api/admin/products";

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Хатогӣ ҳангоми сабти маҳсулот");

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Хатогӣ");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-5">
        <h2 className="text-lg font-bold text-stone-900 font-display">
          Маълумоти асосии маҳсулот
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Номи маҳсулот <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Масалан: Spalni hayat"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Категория <span className="text-red-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Ҳолат дар сайт
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 bg-white"
              >
                <option value="ACTIVE">ФАЪОЛ (Дар сомона намоиш дода шавад)</option>
                <option value="HIDDEN">ПИНҲОН (Танҳо дар админ)</option>
              </select>
            </div>
          </div>

          {/* Pricing Controls */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800">
                Нархгузорӣ
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-700">
                <input
                  type="checkbox"
                  checked={isPriceOnRequest}
                  onChange={(e) => setIsPriceOnRequest(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span>«Нарх бо дархост» (бе нишон додани рақам)</span>
              </label>
            </div>

            {!isPriceOnRequest ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Маблағи нарх (бо рақам)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="13000"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Асъор
                  </label>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm bg-white"
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-stone-500 italic">
                Дар сомона ба ҷои нархи мушаххас ба таври худкор «Нарх бо дархост» нишон дода мешавад.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Specifications & Included Items */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-5">
        <h2 className="text-lg font-bold text-stone-900 font-display">
          Хусусиятҳо ва Комплектность
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Андоза (Size)
            </label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Масалан: 320"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm"
            />
            <span className="text-[10px] text-stone-400 mt-0.5 block">
              Айнан тавре, ки менависед дар сайт нишон дода мешавад (масалан: 320)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Мавод (Material)
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Масалан: MDF, Чӯби табиӣ"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm"
            />
          </div>
        </div>

        {/* Included Items Checklist Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-stone-700">
            Чиҳо ба комплект дохил мешаванд:
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {includedItems.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIncludedItem(idx)}
                  className="p-0.5 text-stone-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddIncludedItem();
                }
              }}
              placeholder="Иловаи ҷузъ: Шкаф, Тумбочка, Комод, Оина..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-sm"
            />
            <button
              type="button"
              onClick={handleAddIncludedItem}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              + Илова
            </button>
          </div>
        </div>

        {/* Service Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-800">
            <input
              type="checkbox"
              checked={deliveryAvailable}
              onChange={(e) => setDeliveryAvailable(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span>Доставка дастрас аст</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-800">
            <input
              type="checkbox"
              checked={assemblyAvailable}
              onChange={(e) => setAssemblyAvailable(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span>Насб ва васл дастрас аст</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-800">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
            />
            <span>⭐ Маҳсулоти машҳур</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Тавсифи иловагӣ (Description)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Маълумоти бештар оид ба мавод, тарҳ ё кафолат..."
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* 3. Multi-Image Management & Upload */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-display">
              Аксҳои маҳсулот (Multi-image)
            </h2>
            <p className="text-xs text-stone-500">
              Шумо метавонед якчанд акси воқеиро бор кунед ва акси асосиро интихоб намоед
            </p>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold border border-brand-200 transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Боргирӣ...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>+ Боркунии акс аз компютер</span>
              </>
            )}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* External URL alternative */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customImageUrl}
            onChange={(e) => setCustomImageUrl(e.target.value)}
            placeholder="Ё пайванди мустақими аксро (URL) ворид кунед..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
          />
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
          >
            Иловаи URL
          </button>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden border-2 bg-stone-100 group aspect-square flex flex-col justify-between p-2.5 ${
                img.isMain ? "border-amber-500 ring-2 ring-amber-500/20" : "border-stone-200"
              }`}
            >
              <Image
                src={img.url}
                alt={`Photo ${idx + 1}`}
                fill
                sizes="200px"
                className="object-cover -z-0"
              />

              {/* Main Badge or Button */}
              <div className="relative z-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSetMainImage(idx)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-soft ${
                    img.isMain
                      ? "bg-amber-500 text-stone-950"
                      : "bg-black/60 text-white hover:bg-black/80"
                  }`}
                >
                  <Star className={`w-3 h-3 ${img.isMain ? "fill-stone-950" : ""}`} />
                  <span>{img.isMain ? "Асосӣ" : "Асосӣ кардан"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteImage(idx)}
                  className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white shadow-soft transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reordering Controls */}
              <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-[10px]">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveImage(idx, idx - 1)}
                  className="disabled:opacity-30 hover:text-brand-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <span>#{idx + 1}</span>
                <button
                  type="button"
                  disabled={idx === images.length - 1}
                  onClick={() => handleMoveImage(idx, idx + 1)}
                  className="disabled:opacity-30 hover:text-brand-300"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors"
        >
          Бекор кардан
        </button>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white text-sm font-bold shadow-soft transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Сабт шуда истодааст...</span>
            </>
          ) : (
            <span>{isEdit ? "Нигоҳдории тағйирот" : "Сабти маҳсулот"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
