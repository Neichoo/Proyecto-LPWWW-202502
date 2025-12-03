import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { getJson } from "../../../../lib/api";

export const MainContentSection = (): JSX.Element => {
  const [orders, setOrders] = useState<
    { id: number; content: string; status: string; total: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emittedDetail, setEmittedDetail] = useState<any | null>(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getJson("/api/admin/orders");
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error("No autorizado. Inicia sesión como administrador.");
          }
          throw new Error(`HTTP ${res.status}`);
        }

        const data = Array.isArray(res.data) ? res.data : [res.data];

        const parseNumber = (raw: any) => {
          if (raw === null || raw === undefined) return NaN;
          const s = String(raw).trim();
          // quitar currency symbols y espacios
          const cleaned = s.replace(/[^0-9.,-]/g, "");
          if (cleaned === "") return NaN;
          // Si tiene ambos separadores, asumir '.' miles y ',' decimal: "1.234,56"
          if (cleaned.includes(".") && cleaned.includes(",")) {
            return Number(cleaned.replace(/\./g, "").replace(/,/g, "."));
          }
          // Si tiene solo ',' usar como decimal "1234,56"
          if (cleaned.includes(",") && !cleaned.includes(".")) {
            return Number(cleaned.replace(/,/g, "."));
          }
          // Solo puntos: puede ser "1234.56" o "1.234" (si es int con thousands sep)
          // Si hay puntos y todos grupos de 3 dígitos tras puntos, removerlos (thousands)
          if (cleaned.includes(".") && /^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
            return Number(cleaned.replace(/\./g, ""));
          }
          return Number(cleaned);
        };

        console.info("API /api/admin/orders raw data:", data);

        setOrders(
          data.map((o: any) => {
            const content = o.items
              ?.map((it: any) => `${it.quantity} x ${it.name}`)
              .join(", ") || "";

            // intentar leer total directo, parsearlo robustamente
            const apiTotalRaw = o.total ?? o.total_amount ?? o.amount ?? null;
            const parsedTotal = parseNumber(apiTotalRaw);

            // fallback: calcular desde items si total inválido
            const computedFromItems =
              (o.items || []).reduce((acc: number, it: any) => {
                const price = parseNumber(it.price ?? it.unit_price ?? 0) || 0;
                const qty = parseNumber(it.quantity ?? it.qty ?? 0) || 0;
                return acc + price * qty;
              }, 0);

            const finalTotal = Number.isFinite(parsedTotal) && !Number.isNaN(parsedTotal)
              ? parsedTotal
              : computedFromItems;

            // debug por orden si total es 0
            if ((finalTotal === 0 || Number.isNaN(finalTotal)) && process.env.NODE_ENV !== "production") {
              console.warn(`Order ${o.id} total parsed => apiTotal:${apiTotalRaw} parsed:${parsedTotal} computed:${computedFromItems}`);
            }

            return {
              id: Number(o.id),
              content,
              status: o.status,
              total: finalTotal,
            };
           })
         );
      } catch (err: any) {
        setError(err.message || "Error al obtener órdenes pendientes");
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleEmitirBoleta = async (orderId: number) => {
    try {
      const res = await getJson(`/api/orders/${orderId}`);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("No autorizado para ver la boleta. Revisa token/roles.");
        }
        throw new Error(`HTTP ${res.status}`);
      }

      setEmittedDetail(res.data);
    } catch (err: any) {
      alert(err.message || "Error al obtener detalle de boleta");
    }
  };

  const closeModal = () => setEmittedDetail(null);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("es-CL").format(v) + " $";

  if (loading)
    return (
      <section className="flex flex-col w-full opacity-0 animate-fade-in">
        <div className="flex items-center justify-center py-8">Cargando órdenes...</div>
      </section>
    );

  if (error)
    return (
      <section className="flex flex-col w-full opacity-0 animate-fade-in">
        <div className="flex items-center justify-center py-8 text-red-600">Error: {error}</div>
      </section>
    );

  return (
    <section className="flex flex-col w-full opacity-0 animate-fade-in">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-[#858585] hover:bg-[#858585]">
            <TableHead className="w-[300px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Numero de Boleta
              </div>
            </TableHead>
            <TableHead className="w-[446px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Contenido de la
                <br />
                Boleta
              </div>
            </TableHead>
            <TableHead className="w-[446px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Estado de Pedido
              </div>
            </TableHead>
            <TableHead className="w-[302px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Total a
                <br />
                Pagar
              </div>
            </TableHead>
            <TableHead className="w-[264px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Emitir
                <br />
                Boleta
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="bg-[#dddddd] hover:bg-[#dddddd]">
              <TableCell className="w-[300px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                  {order.id}
                </div>
              </TableCell>
              <TableCell className="w-[446px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal] whitespace-pre-line">
                  {order.content}
                </div>
              </TableCell>
              <TableCell className="w-[446px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal] whitespace-pre-line">
                  {order.status}
                </div>
              </TableCell>
              <TableCell className="w-[302px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                  {formatCurrency(order.total)}
                </div>
              </TableCell>
              <TableCell className="w-[264px] h-[151px] border border-solid border-black text-center p-0">
                <div className="flex items-center justify-center h-full">
                  <Button
                    className={`w-52 h-20 bg-[#27686b] border border-solid border-black rounded-none hover:opacity-90 transition-opacity h-auto`}
                    onClick={() => handleEmitirBoleta(order.id)}
                  >
                    <span className="[font-family:'Roboto',Helvetica] font-normal text-white text-3xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      Emitir Boleta
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de detalle emitido */}
      {emittedDetail && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            {/* Botón de cerrar dentro del cuadro */}
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-black"
              onClick={closeModal}
            >
              ×
            </button>

            <h3 className="text-xl font-bold mb-4">Boleta #{emittedDetail.id}</h3>

            <div className="mb-4">
              <ul className="divide-y">
                {(emittedDetail.items || []).map((it: any, idx: number) => (
                  <li key={idx} className="py-2 flex justify-between">
                    <div>
                      {it.name} x {it.quantity}
                    </div>
                    <div>{formatCurrency(Number(it.price) * Number(it.quantity))}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <div>Total:</div>
              <div>{formatCurrency(Number(emittedDetail.total || 0))}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
