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
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck
} from "lucide-react";
import { formatPrice, formatPhone } from "@/lib/utils";
import OrderStatusChanger from "./OrderStatusChanger";

export const dynamic = "force-dynamic";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const orderId = parseInt(id);

  if (isNaN(orderId)) {
    notFound();
  }

  let order: any = null;
  try {
    order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        client: {
          include: {
            orders: {
              where: { id: { not: orderId } },
              take: 5,
              orderBy: { createdAt: "desc" },
            },
          },
        },
        items: true,
      },
    });
  } catch (err) {
    console.error("Error fetching order:", err);
  }

  if (!order) {
    notFound();
  }

  // Pre-fill WhatsApp link to client
  const rawClientPhone = (order.clientPhone || "").replace(/\D/g, "");
  const whatsAppClientLink = `https://wa.me/${rawClientPhone}?text=${encodeURIComponent(
    `Салом, ${order.clientName}! Шумо аз сомонаи мо мебели «${order.items?.[0]?.productName || "мебел"}»-ро фармоиш дода будед (Фармоиш #${order.id}). Барои тасдиқи таҳвил муроҷиат намудем.`
  )}`;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-soft-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-stone-900 font-display">
                Фармоиш #{order.id}
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Сабт шудааст: {new Date(order.createdAt).toLocaleString("tg-TJ")}
            </p>
          </div>
        </div>

        {/* Action Buttons to contact client */}
        <div className="flex items-center gap-2.5">
          <a
            href={whatsAppClientLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Навиштан ба муштарӣ дар WhatsApp</span>
          </a>

          <a
            href={`tel:+${order.clientPhone}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-soft transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Занг задан</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Order Items & Client Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ordered Products Snapshot */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-600" />
              <span>Маҳсулоти фармоишшуда</span>
            </h2>

            <div className="divide-y divide-stone-100">
              {order.items?.map((item: any) => (
                <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      {item.productName}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-stone-500 mt-1">
                      {item.productSize && (
                        <span className="bg-stone-100 px-2 py-0.5 rounded font-medium text-stone-700">
                          Андоза: {item.productSize}
                        </span>
                      )}
                      {item.productMaterial && (
                        <span className="bg-stone-100 px-2 py-0.5 rounded font-medium text-stone-700">
                          Мавод: {item.productMaterial}
                        </span>
                      )}
                      <span className="bg-stone-100 px-2 py-0.5 rounded font-medium text-stone-700">
                        Миқдор: <b>{item.quantity} адад</b>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-base text-stone-950 font-display">
                      {formatPrice(item.productPrice ? item.productPrice * item.quantity : null)}
                    </div>
                    {item.productPrice && item.quantity > 1 && (
                      <div className="text-[11px] text-stone-400">
                        {formatPrice(item.productPrice)} барои 1 адад
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-base font-extrabold text-stone-950">
              <span>Ҷамъи маблағ:</span>
              <span className="text-xl font-display">{formatPrice(order.totalPrice)}</span>
            </div>

            {order.comment && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Шарҳи муштарӣ ҳангоми фармоиш:</span>
                {order.comment}
              </div>
            )}
          </div>

          {/* Client Details */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>Маълумоти муштарӣ ва таҳвил</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-xs text-stone-500 font-semibold block mb-0.5">
                  Ному насаб:
                </span>
                <div className="font-bold text-stone-900">{order.clientName}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-xs text-stone-500 font-semibold block mb-0.5">
                  Рақами телефон:
                </span>
                <div className="font-bold text-brand-700 font-mono">
                  {formatPhone(order.clientPhone)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-xs text-stone-500 font-semibold block mb-0.5">
                  Шаҳр / Ноҳия:
                </span>
                <div className="font-bold text-stone-900">{order.city}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-xs text-stone-500 font-semibold block mb-0.5">
                  Суроғаи дақиқ:
                </span>
                <div className="font-bold text-stone-900">{order.address}</div>
              </div>
            </div>

            {/* Other orders by this client */}
            {order.client?.orders && order.client.orders.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Дигар фармоишҳои ин муштарӣ ({order.client.totalOrders || order.client.orders.length} фармоиш):
                </div>
                <div className="space-y-1.5">
                  {order.client.orders.map((otherOrder: any) => (
                    <Link
                      key={otherOrder.id}
                      href={`/admin/orders/${otherOrder.id}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs transition-colors"
                    >
                      <span className="font-bold text-stone-800">
                        Фармоиш #{otherOrder.id} ({otherOrder.status})
                      </span>
                      <span className="text-stone-500">
                        {new Date(otherOrder.createdAt).toLocaleDateString("tg-TJ")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Status Pipeline & Admin Notes */}
        <div className="space-y-6">
          <OrderStatusChanger
            orderId={order.id}
            initialStatus={order.status}
            initialNotes={order.adminNotes || ""}
          />
        </div>
      </div>
    </div>
  );
}
