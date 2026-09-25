import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  User,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { formatPrice, formatPhone } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;

  let client: any = null;
  try {
    client = await db.client.findUnique({
      where: { id },
      include: {
        orders: {
          include: { items: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching client:", err);
  }

  if (!client) {
    notFound();
  }

  const rawPhone = (client.phone || "").replace(/\D/g, "");
  const whatsAppClientLink = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    `Салом, ${client.name}! Мо аз маркази мебели «Мебели Тоҷикистон» муроҷиат мекунем.`
  )}`;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/clients"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-soft-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 font-display">
              {client.name}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Сабт шудааст: {new Date(client.createdAt).toLocaleDateString("tg-TJ")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={whatsAppClientLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:+${client.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-soft transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Занг задан</span>
          </a>
        </div>
      </div>

      {/* Client Overview Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm p-6">
        <h2 className="text-base font-bold text-stone-900 font-display mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-600" />
          <span>Маълумоти муштарӣ</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <span className="text-xs text-stone-500 font-semibold block mb-0.5">Телефон:</span>
            <div className="font-bold text-brand-700 font-mono">{formatPhone(client.phone)}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <span className="text-xs text-stone-500 font-semibold block mb-0.5">Шаҳр / Суроға:</span>
            <div className="font-bold text-stone-900">{client.city || "—"}</div>
            <div className="text-xs text-stone-500">{client.address || "—"}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <span className="text-xs text-stone-500 font-semibold block mb-0.5">Ҳамаи фармоишҳо:</span>
            <div className="font-extrabold text-stone-900 text-lg font-display">{client.orders?.length || 0} фармоиш</div>
          </div>
        </div>
      </div>

      {/* Client Orders History */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-600" />
            <span>Таърихи фармоишҳои ин муштарӣ</span>
          </h2>
        </div>

        <div className="divide-y divide-stone-100">
          {client.orders?.map((order: any) => (
            <div key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-stone-900 text-base">
                    Фармоиш #{order.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-800">
                    {order.status}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Сана: {new Date(order.createdAt).toLocaleString("tg-TJ")} • Суроға: {order.city}, {order.address}
                </div>
                <div className="text-xs text-stone-700 mt-1">
                  Маҳсулот: <b>{order.items?.map((i: any) => `${i.productName} (${i.quantity} дона)`).join(", ")}</b>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <div className="text-xs text-stone-400">Маблағ:</div>
                  <div className="font-bold text-base text-stone-950 font-display">
                    {formatPrice(order.totalPrice)}
                  </div>
                </div>

                <Link
                  href={`/admin/orders/${order.id}`}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  Кушодан
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
