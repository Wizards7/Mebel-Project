import { Product } from "@/types/product";

export const products: Product[] = [
  // 1. Спальные гарнитуры (Example requested by user)
  {
    id: "prod-1",
    slug: "spalni-hayat",
    name: "Spalni hayat",
    category: "spalnye-garnitury",
    categoryName: "Спальные гарнитуры",
    tajikCategoryName: "Гарнитурҳои хоб",
    price: 13000,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "320",
    material: "MDF",
    includedItems: [
      "Шкаф",
      "Тумбочка",
      "Комод",
      "Диван"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    phone: "111225554",
    featured: true,
    description: "Гарнитури хоби бароҳат ва муосири «Spalni hayat» аз маводи хушсифати MDF бо тарҳи зебо ва тобовар барои хонаи шумо."
  },
  {
    id: "prod-2",
    slug: "spalni-oromi",
    name: "Спальный гарнитур «Оромӣ»",
    category: "spalnye-garnitury",
    categoryName: "Спальные гарнитуры",
    tajikCategoryName: "Гарнитурҳои хоб",
    price: 16500,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "340",
    material: "MDF + Чӯби табиӣ",
    includedItems: [
      "Шкафи 6-дарвоза",
      "Кати дукаса",
      "2 адад тумбочка",
      "Комод бо оина"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    phone: "111225554",
    featured: true,
    description: "Гарнитури хоби боҳашамат бо рангҳои равшан ва фурнитураи мустаҳкам."
  },
  {
    id: "prod-3",
    slug: "spalni-shohona",
    name: "Спальный гарнитур «Шоҳона»",
    category: "spalnye-garnitury",
    categoryName: "Спальные гарнитуры",
    tajikCategoryName: "Гарнитурҳои хоб",
    price: undefined, // "Нарх бо дархост"
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "360",
    material: "Чӯби табиӣ + Кандакорӣ",
    includedItems: [
      "Шкафи калон бо оинаҳо",
      "Кати шоҳона",
      "2 тумбочка",
      "Трюмо бо курсича"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: false,
    description: "Гарнитури дараҷаи премиум бо кандакории зебо. Нарх вобаста ба интихоби мавод ва андоза муайян карда мешавад."
  },

  // 2. Гостиные
  {
    id: "prod-4",
    slug: "gostinaya-modern",
    name: "Гостиная «Модерн ТВ»",
    category: "gostinye",
    categoryName: "Гостиные",
    tajikCategoryName: "Мебели меҳмонхона",
    price: 8500,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "280",
    material: "MDF глянец + ЛДСП",
    includedItems: [
      "Тумбаи ТВ",
      "Витринаи шишагӣ бо чароғакҳо",
      "Рафи овезон"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: true,
    description: "Девори замонавии меҳмонхона бо ҷойи махсус барои телевизор ва витринаи зебои шишагӣ."
  },
  {
    id: "prod-5",
    slug: "gostinaya-elita",
    name: "Гостиная «Элита»",
    category: "gostinye",
    categoryName: "Гостиные",
    tajikCategoryName: "Мебели меҳмонхона",
    price: undefined, // "Нарх бо дархост"
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "350",
    material: "Чӯби хушсифат + MDF",
    includedItems: [
      "Девори пурраи меҳмонхона",
      "2 витринаи паҳлӯӣ",
      "Комоди барӣ"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: false,
    description: "Маҷмӯи калонҳаҷм барои толор ва меҳмонхонаҳои барҳаво."
  },

  // 3. Кухонные гарнитуры
  {
    id: "prod-6",
    slug: "kuhnya-safed",
    name: "Кухонный гарнитур «Сафед»",
    category: "kukhonnye-garnitury",
    categoryName: "Кухонные гарнитуры",
    tajikCategoryName: "Гарнитурҳои ошхона",
    price: 11200,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "300",
    material: "MDF крашеный (обгузар)",
    includedItems: [
      "Шкафҳои болоӣ",
      "Шкафҳои поёнӣ",
      "Столешницаи тобовар",
      "Ҷойи раковина ва газ"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: true,
    description: "Мебели ошхонаи сафед бо маводи ба наму намӣ тобовар ва тарҳи минималистӣ."
  },
  {
    id: "prod-7",
    slug: "kuhnya-loft",
    name: "Кухонный гарнитур «Лофт»",
    category: "kukhonnye-garnitury",
    categoryName: "Кухонные гарнитуры",
    tajikCategoryName: "Гарнитурҳои ошхона",
    price: 14500,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "360",
    material: "MDF + Металл + Столешницаи сунъӣ",
    includedItems: [
      "Гарнитури кунҷӣ",
      "Ҷазираи ошхона (Остров)",
      "Фурнитура бо доводчик"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: false,
    description: "Ошхонаи замонавӣ дар услуби Лофт бо сифати аъло ва фурнитураи мулоимпӯшиш."
  },

  // 4. Шкафы
  {
    id: "prod-8",
    slug: "shkaf-kupe-zerkalo",
    name: "Шкаф-купе бо оина",
    category: "shkafy",
    categoryName: "Шкафы",
    tajikCategoryName: "Шкафҳо ва ҷевонҳо",
    price: 4800,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "240",
    material: "ЛДСП + Шишаи оинагӣ",
    includedItems: [
      "3 дари лағжанда",
      "Рафҳои дохилӣ",
      "Овеза барои либос (штанга)",
      "Оинаи калони фасад"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: true,
    description: "Шкаф-купеи калон бо оина барои нигоҳдории бароҳати ҳамаи либосҳо ва ашёи рӯзгор."
  },
  {
    id: "prod-9",
    slug: "shkaf-garderob-4dara",
    name: "Шкафи гардеробӣ 4-дара",
    category: "shkafy",
    categoryName: "Шкафы",
    tajikCategoryName: "Шкафҳо ва ҷевонҳо",
    price: 5500,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "200",
    material: "MDF фрезеровкашуда",
    includedItems: [
      "4 дари классикӣ",
      "2 ҷевони поёнӣ (ящик)",
      "Рафҳо ва овезаҳо"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: false,
    description: "Шкафи классикӣ бо фасади зебои кандакоришудаи MDF."
  },

  // 5. Диваны
  {
    id: "prod-10",
    slug: "divan-komfort-uglovoy",
    name: "Дивани кунҷии «Комфорт»",
    category: "divany",
    categoryName: "Диваны",
    tajikCategoryName: "Диванҳо ва нарммебел",
    price: 6900,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "300",
    material: "Матои велюри зидди доғ + Поролони зич",
    includedItems: [
      "Дивани кунҷӣ бо механизми кушодашавӣ",
      "Ҷойи калон барои курпаю болишт",
      "3 болишти мулоим"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: true,
    description: "Дивани мулоим ва бисёр бароҳат бо матои тобовар, ки ба осонӣ тоза карда мешавад."
  },
  {
    id: "prod-11",
    slug: "divan-chestar",
    name: "Диван «Честерфилд»",
    category: "divany",
    categoryName: "Диваны",
    tajikCategoryName: "Диванҳо ва нарммебел",
    price: 8900,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "220",
    material: "Чарми эко / Велюр",
    includedItems: [
      "Дивани 3-нафара",
      "Пояҳои чӯбӣ"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: false,
    description: "Тарҳи классикӣ ва боҳашамат барои хонаҳои замонавӣ ва офис."
  },

  // 6. Кровати
  {
    id: "prod-12",
    slug: "krovat-rohat-ortoped",
    name: "Кати дукасаи «Роҳат» бо матрас",
    category: "krovati",
    categoryName: "Кровати",
    tajikCategoryName: "Катҳо ва кроватьҳо",
    price: 4200,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "180",
    material: "Чӯби табиӣ + Сари кати мулоим (велюр)",
    includedItems: [
      "Кати устувори дукаса",
      "Матраси ортопедии пружинадор",
      "Механизми бардорандаи таг"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: true,
    description: "Кати бароҳати дукаса бо матраси ортопедӣ барои хоби беҳтарин ва сиҳатии сутунмӯҳра."
  },
  {
    id: "prod-13",
    slug: "krovat-mono",
    name: "Кати яккаса «Моно»",
    category: "krovati",
    categoryName: "Кровати",
    tajikCategoryName: "Катҳо ва кроватьҳо",
    price: 2400,
    currency: "сомонӣ",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop"
    ],
    size: "90",
    material: "MDF + Металл",
    includedItems: [
      "Кати яккаса",
      "Ҷевони таг барои либос"
    ],
    deliveryAvailable: true,
    assemblyAvailable: true,
    featured: false,
    description: "Кати яккаса барои кӯдакон ва наврасон бо сохти бисёр мустаҳкам."
  }
];

// Helper functions for easy data access (ready for future database switch)
export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
