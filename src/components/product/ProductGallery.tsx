"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200";

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image View */}
      <div className="relative aspect-[4/3] sm:aspect-[16/12] w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-soft group">
        <Image
          src={activeImage}
          alt={`${productName} - акс ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Fullscreen Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md shadow-soft transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Калон карда дидан"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Navigation Arrows for multi-images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md shadow-soft transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Акси пешина"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md shadow-soft transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Акси оянда"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-900/80 text-white backdrop-blur-md">
              {selectedIndex + 1} аз {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {images.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden bg-stone-100 border-2 transition-all ${
                  isSelected
                    ? "border-brand-600 ring-2 ring-brand-500/20 shadow-soft"
                    : "border-stone-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox / Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Пӯшидан"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-[75vh]">
            <Image
              src={activeImage}
              alt={`${productName} fullscreen`}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prevImage}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-white text-sm font-semibold">
                {selectedIndex + 1} / {images.length}
              </span>
              <button
                onClick={nextImage}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
