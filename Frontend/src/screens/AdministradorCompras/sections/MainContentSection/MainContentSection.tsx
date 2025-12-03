import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { getJson, putJson } from "../../../../lib/api";

interface Order {
  id: string;
  status: "Preparando" | "En espera" | "Retiro" | "Entregado";
}

interface OrderDetailsModalProps {
  data: any; // json del pedido
  onClose: () => void;
}

const STATUS_OPTIONS = ["Preparando", "En espera", "Retiro", "Entregado"];

export const MainContentSection = (): JSX.Element => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsData, setDetailsData] = useState<any | null>(null);

  // Obtener órdenes
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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
      setOrderData(res.data as Order[]);
    } catch (err: any) {
      setError(err.message || "Error al obtener órdenes");
    } finally {
      setLoading(false);
    }
  };

  // Ver detalle del pedido
  const handleViewDetails = async (orderId: string) => {
    try {
      const res = await getJson(`/api/admin/orders/${orderId}`);
      if (!res.ok) throw new Error("Error al obtener detalles");
      setDetailsData(res.data);
    } catch (err: any) {
      alert(err.message || "Error desconocido");
    }
  };

  // Actualizar estado del pedido
  const handleStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      const res = await putJson(`/api/admin/orders/${orderId}/status`, {
        status: newStatus,
      });

      if (!res.ok) {
        throw new Error(res.data?.detail?.[0]?.msg || "Error al actualizar estado");
      }

      // Actualizar el estado en la lista de pedidos
      setOrderData(
        orderData.map((order) =>
          order.id === orderId ? { ...order, status: newStatus as Order["status"] } : order
        )
      );

      // Mostrar mensaje de éxito
      alert(`Estado del pedido ${orderId} se a cambiado: "${newStatus}"`);
    } catch (err: any) {
      alert(err.message || "Error desconocido");
    }
  };

  // Cancelar pedido
  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("¿Estás seguro de que deseas cancelar este pedido?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`/api/admin/orders/${orderId}/cancel`, {
        method: "POST",
        headers,
      });

      let data: any = null;

      try {
        data = await response.json(); // intentar parsear JSON
      } catch {
        // si no es JSON, crear un mensaje por defecto
        data = { message: "Pedido cancelado (sin respuesta JSON)" };
      }

      if (!response.ok) {
        // FastAPI pone el mensaje de error en "detail"
        throw new Error(data?.message || data?.detail || "Error al cancelar pedido");
      }

      alert(data.message); // mostrar mensaje de éxito

      setOrderData(orderData.filter((order) => order.id !== orderId));
    } catch (err: any) {
      alert(err.message || "Error desconocido");
    }
  };

  const OrderDetailsModal = ({ data, onClose }: OrderDetailsModalProps) => {
    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
          >
            ×
          </button>
          <h3 className="text-lg font-bold mb-4">Detalles del Pedido</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Usuario:</h4>
              <p className="text-gray-700">{JSON.stringify(data.user, null, 2)}</p>
            </div>

            <div>
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {data.items?.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name} x {item.quantity} - ${item.price.toLocaleString("es-CL")}
                  </li>
                )) || <li>No hay items</li>}
              </ul>
            </div>
          </div>
        </div>
    );
  };

  if (loading)
    return (
      <section className="flex items-center justify-center py-8">
        Cargando órdenes...
      </section>
    );

  if (error)
    return (
      <section className="flex items-center justify-center py-8 text-red-600">
        Error: {error}
      </section>
    );

  return (
    <section className="flex flex-col w-full items-center gap-4">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-black">
              <TableHead className="w-[276px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                ID
              </TableHead>
              <TableHead className="w-[587px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                Pedido
              </TableHead>
              <TableHead className="w-[295px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                Estado
              </TableHead>
              <TableHead className="w-[578px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                Cancelar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((order) => (
              <TableRow key={order.id} className="h-12">
                <TableCell className="font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                  {order.id}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleViewDetails(order.id)}
                    className="hover:bg-transparent hover:underline"
                  >
                    Ver detalles
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleCancelOrder(order.id)}
                    className="h-8 w-8 p-0 hover:bg-red-100"
                  >
                    <span className="text-red-600 text-xl font-bold">−</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Modal */}
      {detailsData && (
        <OrderDetailsModal
          data={detailsData}
          onClose={() => setDetailsData(null)}
        />
      )}
    </section>
  );
};
