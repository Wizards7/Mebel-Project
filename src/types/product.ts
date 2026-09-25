export type CategorySlug =
  | 'spalnye-garnitury'
  | 'gostinye'
  | 'kukhonnye-garnitury'
  | 'shkafy'
  | 'divany'
  | 'krovati';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;          // e.g. "Спальные гарнитуры"
  tajikName: string;     // e.g. "Гарнитурҳои хоб"
  description: string;
  image: string;
  badge?: string;
  itemCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  tajikCategoryName?: string;
  price?: number;                  // Optional numeric price in TJS (e.g. 13000)
  currency?: string;               // default "сомонӣ"
  images: string[];                // List of image URLs / paths (multiple images per product)
  size?: string;                   // Size string, displayed exactly as provided (e.g. "320")
  material?: string;               // e.g. "MDF", "Чӯби табиӣ", "ЛДСП"
  includedItems?: string[];        // e.g. ["Шкаф", "Тумбочка", "Комод", "Диван"]
  deliveryAvailable: boolean;      // true -> "Доставка дар тамоми Тоҷикистон"
  assemblyAvailable: boolean;      // true -> "Насб карда мешавад"
  phone?: string;                  // Seller phone number (optional override, otherwise site default)
  featured?: boolean;              // Highlight on home page
  description?: string;            // Simple description
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  defaultPhone: string;
  displayPhone: string;
  whatsAppPhone: string;
  location: string;
  addressFull: string;
  deliveryText: string;
  workingHours: string;
  telegramUrl?: string;
  instagramUrl?: string;
}
