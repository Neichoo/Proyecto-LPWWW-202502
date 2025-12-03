import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { getJson, postJson, putJson } from "../../lib/api";

type OrderAPI = {
  id: number;
  created_at?: string;
  status: string;
  total: number;
  items?: { name?: string; quantity?: number; price?: number }[];
};

export const Despacho = (): JSX.Element => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const parseNumber = (raw: any) => {
    if (raw === null || raw === undefined) return NaN;
    const s = String(raw).trim();
    const cleaned = s.replace(/[^0-9.,-]/g, "");
    if (cleaned === "") return NaN;
    if (cleaned.includes(".") && cleaned.includes(",")) {
      return Number(cleaned.replace(/\./g, "").replace(/,/g, "."));
    }
    if (cleaned.includes(",") && !cleaned.includes(".")) {
      return Number(cleaned.replace(/,/g, "."));
    }
    if (cleaned.includes(".") && /^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
      return Number(cleaned.replace(/\./g, ""));
    }
    return Number(cleaned);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getJson("/api/admin/orders");
        if (!res.ok) {
          throw new Error(res.status === 401 || res.status === 403 ? "No autorizado. Inicia sesión como administrador." : `HTTP ${res.status}`);
        }

        const data = Array.isArray(res.data) ? res.data : [res.data];

        setOrders(
          data.map((o: any) => {
            const content = o.items?.map((it: any) => `${it.quantity} x ${it.name}`).join(", ") || "";
            const apiTotalRaw = o.total ?? o.total_amount ?? o.amount ?? null;
            const parsedTotal = parseNumber(apiTotalRaw);
            const computedFromItems =
              (o.items || []).reduce((acc: number, it: any) => {
                const price = parseNumber(it.price ?? 0) || 0;
                const qty = parseNumber(it.quantity ?? it.qty ?? 0) || 0;
                return acc + price * qty;
              }, 0);
            const finalTotal = Number.isFinite(parsedTotal) && !Number.isNaN(parsedTotal) ? parsedTotal : computedFromItems;

            return {
              id: Number(o.id),
              created_at: o.created_at ?? o.date,
              status: o.status,
              total: finalTotal,
              items: o.items,
              // keep content available on render if needed
              // content,
            } as OrderAPI;
          })
        );
      } catch (err: any) {
        setError(err.message || "Error al obtener órdenes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString("es-CL");
    } catch {
      return iso;
    }
  };

  const formatCurrency = (v: number) => new Intl.NumberFormat("es-CL").format(v) + " $";

  const nowHHMM = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const handleTake = async (orderId: number) => {
    try {
      const body = { order_id: orderId, status: "Despachado", delivery_time: nowHHMM() };
      // usar helper de API (fastapi)
      const res = await putJson(`/api/orders/${orderId}/dispatch`, body);
      if (!res.ok) throw new Error(res.data?.detail ? JSON.stringify(res.data.detail) : `HTTP ${res.status}`);
      const newStatus = res.data?.status ?? body.status;
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    } catch (err: any) {
      alert(err.message || "Error al tomar pedido");
    }
  };

  const handleCancel = async (orderId: number) => {
    if (!confirm("¿Confirmar cancelación del pedido?")) return;
    try {
      const res = await postJson(`/api/orders/${orderId}/cancel`, {});
      if (!res.ok) throw new Error(res.data?.detail ? JSON.stringify(res.data.detail) : `HTTP ${res.status}`);
      const newStatus = res.data?.status ?? "Cancelado";
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    } catch (err: any) {
      alert(err.message || "Error al cancelar pedido");
    }
  };

  if (loading) return <div className="flex items-center justify-center py-12">Cargando órdenes...</div>;
  if (error) return <div className="flex items-center justify-center py-12 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white w-full min-h-screen flex flex-col" data-model-id="46:443">
      <header className="w-full h-[100px] bg-[#ca2b4b] flex items-center justify-between px-20">
        <div className="flex items-center gap-4">
          <img className="w-[135px] h-[100px] rounded-[50.59px] object-cover" alt="Icono" src="https://c.animaapp.com/mi7te4oqlJu5sd/img/icono-1.png" />
          <h1 className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">Fukusuke</h1>
        </div>
        <Button className="h-auto px-[35.19px] py-[20.53px] bg-[#27686b] hover:bg-[#1f5457] rounded-[11.73px]" onClick={() => { localStorage.removeItem("token"); sessionStorage.removeItem("token"); navigate("/"); }}>
          <span className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px]">Logout</span>
        </Button>
      </header>

      <main className="flex-1 px-20 py-12">
        <div className="max-w-[1453px] mx-auto">
          <div className="flex items-center h-[103px] border-b border-gray-200 bg-gray-100 font-medium">
            <div className="w-[239px] flex items-center justify-center">Numero de boleta</div>
            <Separator orientation="vertical" className="h-[66px] bg-gray-300" />
            <div className="w-[307px] flex items-center justify-center">Fecha de emisión de la boleta</div>
            <Separator orientation="vertical" className="h-[66px] bg-gray-300" />
            <div className="flex-1 flex items-center justify-center">Estado</div>
            <Separator orientation="vertical" className="h-[66px] bg-gray-300" />
            <div className="w-[240px] flex items-center justify-center">Acción</div>
          </div>

          {orders.map((order) => (
            <div key={order.id} className="flex items-center h-[103px] border-b border-gray-200">
              <div className="w-[239px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px]">{order.id}</span>
              </div>
              <Separator orientation="vertical" className="h-[66px] bg-gray-300" />
              <div className="w-[307px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px]">{formatDate(order.created_at)}</span>
              </div>
              <Separator orientation="vertical" className="h-[66px] bg-gray-300" />
              <div className="flex-1 flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px]">{order.status} — {formatCurrency(order.total)}</span>
              </div>
              <Separator orientation="vertical" className="h-[66px] bg-gray-300" />
              <div className="flex items-center px-6">
                {/(Despach|Despachando)/i.test(order.status) ? (
                  <Button className="h-auto px-[12.57px] py-[12.57px] rounded-[8.32px] border-[1.05px] border-solid border-[#b2bf02] bg-yellow-600 text-white" onClick={() => handleCancel(order.id)}>Cancelar</Button>
                ) : (
                  <Button className="h-auto px-[12.57px] py-[12.57px] rounded-[8.32px] border-[1.05px] border-solid border-[#14ae5c] bg-green-600 text-white" onClick={() => handleTake(order.id)}>Tomar pedido</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full h-[264px] bg-white border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-20 pt-12">{/* footer */}</div>
      </footer>
    </div>
  );
};
