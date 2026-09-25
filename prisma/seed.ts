import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories as initialCategories } from "../src/data/categories";
import { products as initialProducts } from "../src/data/products";
import { siteConfig } from "../src/data/siteConfig";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mebel.tj";
  const rawPassword = process.env.ADMIN_PASSWORD || "admin12345";
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      phone: "111225554",
      name: "Администратор",
      passwordHash,
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Settings
  await prisma.setting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: siteConfig.siteName,
      tagline: siteConfig.tagline,
      phone: siteConfig.defaultPhone,
      displayPhone: siteConfig.displayPhone,
      whatsAppPhone: siteConfig.whatsAppPhone,
      address: siteConfig.addressFull,
      workingHours: siteConfig.workingHours,
      deliveryText: siteConfig.deliveryText,
      assemblyText: "Насб ва васли касбӣ дастрас аст",
    },
  });
  console.log("✅ Site settings seeded");

  // 3. Seed Categories
  const categoryMap = new Map<string, string>();

  for (let i = 0; i < initialCategories.length; i++) {
    const cat = initialCategories[i];
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        tajikName: cat.tajikName,
        description: cat.description,
        image: cat.image,
        sortOrder: i,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        tajikName: cat.tajikName,
        description: cat.description,
        image: cat.image,
        sortOrder: i,
        isActive: true,
      },
    });
    categoryMap.set(cat.slug, createdCat.id);
  }
  console.log(`✅ ${initialCategories.length} Categories seeded`);

  // 4. Seed Products
  for (const prod of initialProducts) {
    const categoryId = categoryMap.get(prod.category);
    if (!categoryId) continue;

    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        categoryId,
        price: prod.price ?? null,
        currency: prod.currency || "сомонӣ",
        size: prod.size || null,
        material: prod.material || null,
        includedItems: prod.includedItems ? JSON.stringify(prod.includedItems) : null,
        deliveryAvailable: prod.deliveryAvailable,
        assemblyAvailable: prod.assemblyAvailable,
        phone: prod.phone || null,
        featured: prod.featured || false,
        status: "ACTIVE",
        description: prod.description || null,
      },
      create: {
        slug: prod.slug,
        name: prod.name,
        categoryId,
        price: prod.price ?? null,
        currency: prod.currency || "сомонӣ",
        size: prod.size || null,
        material: prod.material || null,
        includedItems: prod.includedItems ? JSON.stringify(prod.includedItems) : null,
        deliveryAvailable: prod.deliveryAvailable,
        assemblyAvailable: prod.assemblyAvailable,
        phone: prod.phone || null,
        featured: prod.featured || false,
        status: "ACTIVE",
        description: prod.description || null,
      },
    });

    // Delete existing images for clean seed
    await prisma.productImage.deleteMany({
      where: { productId: createdProduct.id },
    });

    // Insert images
    if (prod.images && prod.images.length > 0) {
      await prisma.productImage.createMany({
        data: prod.images.map((imgUrl, index) => ({
          productId: createdProduct.id,
          url: imgUrl,
          isMain: index === 0,
          sortOrder: index,
        })),
      });
    }
  }
  console.log(`✅ ${initialProducts.length} Products with images seeded`);

  // 5. Seed a Sample Order to demonstrate the Dashboard
  const samplePhone = "992900112233";
  const sampleClient = await prisma.client.upsert({
    where: { phone: samplePhone },
    update: {},
    create: {
      phone: samplePhone,
      name: "Алиҷон Раҳимов",
      city: "Душанбе",
      address: "кӯчаи Борбад 45, хонаи 12",
      totalOrders: 1,
    },
  });

  const spalniProduct = await prisma.product.findUnique({
    where: { slug: "spalni-hayat" },
  });

  if (spalniProduct) {
    const existingOrdersCount = await prisma.order.count();
    if (existingOrdersCount === 0) {
      const order = await prisma.order.create({
        data: {
          clientId: sampleClient.id,
          status: "NEW",
          totalPrice: 13000,
          clientName: sampleClient.name,
          clientPhone: samplePhone,
          city: "Душанбе",
          address: "кӯчаи Борбад 45, хонаи 12",
          comment: "Лутфан пеш аз овардан занг занед",
          items: {
            create: {
              productId: spalniProduct.id,
              productName: spalniProduct.name,
              productPrice: 13000,
              productSize: spalniProduct.size,
              productMaterial: spalniProduct.material,
              quantity: 1,
            },
          },
        },
      });
      console.log(`✅ Sample order created: #${order.id}`);
    }
  }

  console.log("🎉 Database seed finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
